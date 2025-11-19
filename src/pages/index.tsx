import { GetStaticProps } from 'next';
import { getTopRatedMovies } from '../lib/tmdb';
import { Header } from '../components/Header';
import MovieList from '../components/MovieList';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Movie } from '../types';

interface HomeProps {
  topRatedMovies: Movie[];
}

export default function Home({ topRatedMovies: initialTopRatedMovies }: HomeProps) {
  const displayedMovies = initialTopRatedMovies.slice(0, 10);

  return (
    <div style={{ 
      background: '#121212', 
      minHeight: '100vh', 
      fontFamily: 'Arial, sans-serif',
      width: '100%',
      overflowX: 'hidden',
    }}>
      <Header />
      
      <div style={{ 
        textAlign: 'center', 
        padding: 'clamp(30px, 5vw, 60px) clamp(15px, 4vw, 40px)',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ 
          color: '#e0e0e0',
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
          fontWeight: '600',
          marginBottom: 'clamp(20px, 4vw, 40px)',
          borderBottom: '2px solid #333',
          paddingBottom: 'clamp(12px, 2vw, 15px)',
          paddingLeft: 'clamp(15px, 3vw, 20px)',
          paddingRight: 'clamp(15px, 3vw, 20px)',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          Top Rated Movies
        </h2>

        <MovieList movies={displayedMovies} />

        <div style={{ marginTop: 'clamp(30px, 5vw, 50px)', padding: '0 20px' }}>
          <Link href="/movies" passHref>
            <Button>
              Explore Movies
            </Button>
          </Link> 
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const topRatedMoviesData = await getTopRatedMovies(1, 1);
  
  return {
    props: {
      topRatedMovies: topRatedMoviesData.results || [],
    },
    revalidate: 3600,
  };
}