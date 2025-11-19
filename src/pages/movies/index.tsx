import { GetStaticProps } from 'next';
import { getPopularMovies } from '../../lib/tmdb';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../components/Button'; 
import { FilterButton } from '../../components/FilterButton';
import { Movie } from '../../types'; 

const MOVIES_PER_PAGE = 12;

function extractFirstLetter(title: string): string {
  if (!title || typeof title !== 'string') return '';
  
  let text = title.trim();
  if (!text) return '';
  
  const lowerText = text.toLowerCase();
  
  if (lowerText.startsWith('the ')) {
    text = text.substring(4).trim();
  } else if (lowerText.startsWith('a ') && text.length > 2) {
    text = text.substring(2).trim();
  } else if (lowerText.startsWith('an ')) {
    text = text.substring(3).trim();
  }
  
  if (!text) {
    text = title.trim();
  }
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-zA-Z]/.test(char)) {
      return char.toUpperCase();
    }
  }
  
  return '';
}

interface MoviesPageProps {
  allMovies: Movie[];
}

export default function MoviesPage({ allMovies: initialMovies }: MoviesPageProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLetter, setFilterLetter] = useState('');

  useEffect(() => {
    if (router.isReady) {
      const page = Number(router.query.page) || 1;
      const filter = (router.query.filter?.toString() || '').toUpperCase().trim();
      
      setCurrentPage(prevPage => prevPage !== page ? page : prevPage);
      setFilterLetter(prevFilter => {
        const normalizedPrev = (prevFilter || '').toUpperCase().trim();
        const normalizedNew = filter || '';
        return normalizedPrev !== normalizedNew ? normalizedNew : prevFilter;
      });
    }
  }, [router.isReady, router.query.page, router.query.filter]);

  const filteredMovies = useMemo(() => {
    const movies = Array.isArray(initialMovies) ? initialMovies : [];
    
    if (!filterLetter || filterLetter.length !== 1 || !/[A-Z]/.test(filterLetter)) {
      return movies;
    }
    
    return movies.filter((movie) => {
      if (!movie?.title || typeof movie.title !== 'string') {
        return false;
      }
      const firstLetter = extractFirstLetter(movie.title);
      return firstLetter === filterLetter;
    });
  }, [initialMovies, filterLetter]);

  const totalMoviesCount = filteredMovies.length;
  const totalPages = Math.ceil(totalMoviesCount / MOVIES_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
      const query: Record<string, string> = { page: '1' };
      if (filterLetter) query.filter = filterLetter;
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
  }, [currentPage, totalPages, filterLetter, router]);

  const movies = useMemo(() => {
    const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));
    const startIndex = (validPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const query: Record<string, string> = { page: page.toString() };
    if (filterLetter) query.filter = filterLetter;
    router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (letter: string) => {
    const normalizedLetter = letter ? letter.toUpperCase().trim() : '';
    
    setFilterLetter(normalizedLetter);
    setCurrentPage(1);
    
    const query: Record<string, string> = { page: '1' };
    if (normalizedLetter && normalizedLetter.length === 1 && /[A-Z]/.test(normalizedLetter)) {
      query.filter = normalizedLetter;
    }
    
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const PaginationButton: React.FC<{ page: number; current: number }> = ({ page, current }) => {
    const isActive = page === current;
    const baseStyle: React.CSSProperties = {
      padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 15px)',
      fontSize: 'clamp(12px, 2.5vw, 14px)',
      backgroundColor: isActive ? '#667eea' : '#2c3138',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold',
      minWidth: 'clamp(35px, 6vw, 40px)',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
    };
    
    const [style, setStyle] = useState(baseStyle);
    
    const hoverStyle: React.CSSProperties = { backgroundColor: isActive ? '#5a67d8' : '#495057', transform: 'translateY(-1px)' };

    return (
      <button 
        onClick={() => handlePageChange(page)} 
        style={style}
        onMouseEnter={() => setStyle({ ...baseStyle, ...hoverStyle })}
        onMouseLeave={() => setStyle(baseStyle)}
      >
        {page}
      </button>
    );
  };

  const getPaginationItems = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    const baseStyle: React.CSSProperties = {
      color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s ease'
    };

    if (currentPage > 1) {
      pageNumbers.push(
        <button 
          key="prev" 
          onClick={() => handlePageChange(currentPage - 1)} 
          style={{ ...baseStyle, backgroundColor: '#2c3138', padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 15px)', minWidth: 'auto', fontSize: 'clamp(12px, 2.5vw, 14px)' }}
        >
          ← Previous
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.push(<PaginationButton key={1} page={1} current={currentPage} />);
      if (startPage > 2) {
        pageNumbers.push(<span key="dots1" style={{ color: '#aaa', margin: '0 5px' }}>...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(<PaginationButton key={i} page={i} current={currentPage} />);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="dots2" style={{ color: '#aaa', margin: '0 5px' }}>...</span>);
      }
      pageNumbers.push(<PaginationButton key={totalPages} page={totalPages} current={currentPage} />);
    }

    if (currentPage < totalPages) {
      pageNumbers.push(
        <button 
          key="next" 
          onClick={() => handlePageChange(currentPage + 1)} 
          style={{ ...baseStyle, backgroundColor: '#2c3138', padding: 'clamp(6px, 1.5vw, 8px) clamp(12px, 2vw, 15px)', minWidth: 'auto', fontSize: 'clamp(12px, 2.5vw, 14px)' }}
        >
          Next →
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div style={{ 
      paddingBottom: 'clamp(30px, 5vw, 50px)',
      fontFamily: 'Arial, sans-serif', 
      background: '#121212', 
      minHeight: '100vh', 
      width: '100%', 
      color: '#e0e0e0',
      overflowX: 'hidden',
      boxSizing: 'border-box',
    }}>

      <div style={{ 
        padding: 'clamp(20px, 4vw, 40px)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <Link href="/" passHref>
          <Button>
            ← Back to Home
          </Button>
        </Link>
  
        <div style={{ marginBottom: 'clamp(20px, 3vw, 30px)', marginTop: 'clamp(20px, 3vw, 30px)' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '700', margin: '0 0', color: '#667eea', lineHeight: '1.2' }}>
            Explore All Movies
          </h1>

          <hr style={{ border: 'none', borderTop: '2px solid #333', margin: '20px 0' }} />
        </div>
  
        <div style={{ marginBottom: 'clamp(20px, 3vw, 30px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(6px, 1vw, 8px)' }}>
          <FilterButton 
            onClick={() => handleFilterChange('')}
            isActive={!filterLetter || filterLetter.trim() === ''}
          >
            All
          </FilterButton>
          {alphabet.map(letter => {
            const currentFilter = (filterLetter || '').toUpperCase().trim();
            const isActive = currentFilter === letter;
            return (
              <FilterButton 
                key={letter} 
                onClick={() => handleFilterChange(letter)}
                isActive={isActive}
              >
                {letter}
              </FilterButton>
            );
          })}
        </div>
  
      </div> 

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(140px, 20vw, 160px), 240px))',
        justifyContent: 'center',
        gap: 'clamp(15px, 3vw, 25px)',
        padding: 'clamp(15px, 3vw, 25px)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.5rem', color: '#aaa' }}>
            {filterLetter ? `No movies found starting with "${filterLetter}".` : 'No movies found.'}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div style={{ 
          marginTop: 'clamp(30px, 5vw, 50px)', 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'center', 
          gap: 'clamp(8px, 1.5vw, 10px)', 
          padding: '0 clamp(15px, 4vw, 40px)',
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {getPaginationItems()}
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const allPopularMoviesData = await getPopularMovies(1, 20);
    
    const movies = Array.isArray(allPopularMoviesData?.results) 
      ? allPopularMoviesData.results 
      : [];
    
    return {
      props: {
        allMovies: movies,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    
    return {
      props: {
        allMovies: [],
      },
      revalidate: 60,
    };
  }
}