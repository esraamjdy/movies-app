import { GetStaticProps, GetStaticPaths } from 'next';
import { getMovieDetails, getPopularMovies } from '../../../lib/tmdb';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../../../components/Button';
import { MovieDetailsWithCredits, Movie, Video, CastMember, Genre, ProductionCompany, ProductionCountry } from '../../../types';

interface MovieDetailProps {
  movie: MovieDetailsWithCredits;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  const [showModal, setShowModal] = useState(false);
  const [modalVideoKey, setModalVideoKey] = useState('');

  const containerStyle: React.CSSProperties = {
    background: '#121212',
    minHeight: '100vh',
    padding: 'clamp(20px, 4vw, 40px) clamp(15px, 3vw, 30px)',
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    backgroundColor: 'black',
    maxWidth: '1400px',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  };

  const movieHeroStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'clamp(20px, 4vw, 50px)',
    flexWrap: 'wrap' ,
    alignItems: 'flex-start',
    marginBottom: 'clamp(40px, 6vw, 60px)',
    marginTop: 'clamp(20px, 3vw, 30px)',
  };

  const posterStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: 'clamp(250px, 40vw, 350px)',
    height: 'auto',
    aspectRatio: '2/3',
    borderRadius: '15px',
    objectFit: 'cover',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)',
  };

  const detailsColumnStyle: React.CSSProperties = {
    flex: '1',
    minWidth: 'min(100%, 400px)',
  };

  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    margin: '0 0 15px 0',
    lineHeight: '1.2',
  };

  const taglineStyle: React.CSSProperties = {
    color: '#ccc',
    fontSize: 'clamp(1rem, 3vw, 1.4rem)',
    fontStyle: 'italic',
    marginBottom: 'clamp(20px, 3vw, 30px)',
  };

  const metaBadgesStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'clamp(10px, 2vw, 15px)',
    flexWrap: 'wrap' ,
    marginBottom: 'clamp(20px, 3vw, 30px)',
  };

  const primaryBadgeStyle: React.CSSProperties = {
    background: '#667eea',
    color: 'white',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(15px, 3vw, 20px)',
    borderRadius: '25px',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    fontWeight: 'bold',
  };

  const secondaryBadgeStyle: React.CSSProperties = {
    background: '#343a40',
    color: '#e9ecef',
    padding: 'clamp(8px, 1.5vw, 10px) clamp(15px, 3vw, 20px)',
    borderRadius: '25px',
    fontSize: 'clamp(13px, 2.5vw, 15px)',
    fontWeight: 'bold',
  };

  const overviewStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 3vw, 18px)',
    lineHeight: '1.8',
    color: '#ccc',
    marginBottom: 'clamp(30px, 4vw, 40px)',
  };

  const infoGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
    gap: 'clamp(20px, 3vw, 30px)',
    borderTop: '1px solid #444',
    paddingTop: 'clamp(20px, 3vw, 30px)',
    marginTop: 'clamp(20px, 3vw, 30px)',
  };

  const infoItemTitleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    marginBottom: '8px',
  };

  const infoItemContentStyle: React.CSSProperties = {
    color: '#ccc',
    margin: '0',
    fontSize: 'clamp(15px, 2.5vw, 17px)',
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    marginTop: 'clamp(40px, 6vw, 60px)',
    marginBottom: 'clamp(20px, 3vw, 30px)',
    borderBottom: '1px solid #444',
    paddingBottom: '15px',
  };

  const castGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100px, 130px), 1fr))',
    gap: 'clamp(15px, 3vw, 25px)',
    justifyContent: 'center',
  };

  const castItemStyle: React.CSSProperties = {
    textAlign: 'center' ,
  };

  const castImageStyle: React.CSSProperties = {
    width: 'clamp(80px, 15vw, 110px)',
    height: 'clamp(80px, 15vw, 110px)',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '12px',
    border: '3px solid #667eea',
  };

  const castNameStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    fontWeight: 'bold',
    margin: '0',
  };

  const castCharacterStyle: React.CSSProperties = {
    color: '#ccc',
    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
    margin: '0',
  };

  const videoContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', 
    height: '0',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)',
    marginBottom: '30px',
  };

  const videoIframeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: 'none',
  };

  const videoWrapperStyle: React.CSSProperties = {
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.4)',
    marginBottom: '25px', 
  };

  const otherVideoItemStyle: React.CSSProperties = {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#2a2a2a',
    paddingBottom: '20px',
  };

  const otherVideoTitleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
    marginTop: '12px',
    marginBottom: '5px',
    textAlign: 'center' ,
    fontWeight: 'bold',
  };

  const otherVideoTypeStyle: React.CSSProperties = {
    color: '#bbb',
    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
    textAlign: 'center',
  };

  const mainTrailer = movie.videos?.results.find((video: Video) => video.type === 'Trailer' && video.site === 'YouTube');
  const otherVideos = movie.videos?.results.filter((video: Video) => video.type !== 'Trailer' && video.site === 'YouTube');

  return (
    <div style={{ backgroundColor:'black',
}}>
    <div style={containerStyle}>
        <Link href="/movies">
          <Button>  Back to Movies</Button>
        </Link>
        
        <div style={movieHeroStyle}>
          <img 
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            style={posterStyle}
          />
          <div style={detailsColumnStyle}>
            <h1 style={titleStyle}>
              {movie.title}
            </h1>
            {movie.tagline && (
              <p style={taglineStyle}>
                {movie.tagline}
              </p>
            )}
            
            <div style={metaBadgesStyle}>
              <span style={primaryBadgeStyle}>
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>
              <span style={secondaryBadgeStyle}>
                {movie.runtime} min
              </span>
              <span style={secondaryBadgeStyle}>
                {movie.release_date}
              </span>
            </div>
            
            <p style={overviewStyle}>
              {movie.overview}
            </p>
            
            <div style={infoGridStyle}>
              <div>
                <strong style={infoItemTitleStyle}>Genres:</strong>
                <p style={infoItemContentStyle}>
                  {movie.genres?.map((g: Genre) => g.name).join(', ')}
                </p>
              </div>
              <div>
                <strong style={infoItemTitleStyle}>Budget:</strong>
                <p style={infoItemContentStyle}>
                  ${movie.budget?.toLocaleString()} USD
                </p>
              </div>
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <strong style={infoItemTitleStyle}>Production:</strong>
                  <p style={infoItemContentStyle}>
                    {movie.production_companies.map((company: ProductionCompany) => company.name).join(', ')}
                  </p>
                </div>
              )}
              {movie.production_countries && movie.production_countries.length > 0 && (
                <div>
                  <strong style={infoItemTitleStyle}>Country:</strong>
                  <p style={infoItemContentStyle}>
                    {movie.production_countries.map((country: ProductionCountry) => country.iso_3166_1).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={sectionTitleStyle}>Top Cast</h2>
            <div style={castGridStyle}>
              {movie.credits.cast.slice(0, 8).map((person: CastMember) => (
                <div key={person.id} style={castItemStyle}>
                  <img 
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w185${person.profile_path}` 
                      : '/path/to/placeholder-image.jpg'} alt={person.name} style={castImageStyle}
                  />
                  <p style={castNameStyle}>{person.name}</p>
                  <p style={castCharacterStyle}>{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {mainTrailer && (
          <div style={{ marginTop: '50px' }}>
            <h2 style={sectionTitleStyle}>Official Trailer</h2>
            <div style={videoWrapperStyle}>
              <div style={videoContainerStyle}>
                <iframe
                  src={`https://www.youtube.com/embed/${mainTrailer.key}?autoplay=0`} 
                  title={`${movie.title} Trailer`}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={videoIframeStyle}
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {otherVideos && otherVideos.length > 0 && (
          <div style={{ marginTop: 'clamp(40px, 6vw, 50px)' }}>
            <h2 style={sectionTitleStyle}>Other Clips & Videos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(15px, 3vw, 20px)' }}>
              {otherVideos.map((video: Video) => (
                <div 
                  key={video.key} 
                  style={{
                    ...otherVideoItemStyle,
                    cursor: 'pointer',
                  }}
                  onClick={() => { setShowModal(true); setModalVideoKey(video.key); }}
                >
                  <div style={videoContainerStyle}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={`${movie.title} ${video.type}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={videoIframeStyle}
                    ></iframe>
                  </div>
                  <p style={otherVideoTitleStyle}>{video.name}</p>
                  <p style={otherVideoTypeStyle}>{video.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {showModal && (
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              position: 'relative',
              width: '90%', 
              maxWidth: '1200px', 
              paddingBottom: '56.25%', 
              height: '0',
              backgroundColor: 'black',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
            }}>
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: 'clamp(10px, 2vw, 15px)',
                  right: 'clamp(10px, 2vw, 15px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: 'clamp(35px, 6vw, 40px)',
                  height: 'clamp(35px, 6vw, 40px)',
                  fontSize: 'clamp(18px, 3vw, 20px)',
                  cursor: 'pointer',
                  zIndex: 1001,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                X
              </button>
              {modalVideoKey && (
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideoKey}?autoplay=1`}
                  title="Movie Clip"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                ></iframe>
              )}
            </div>
          </div>
        )}
    </div>
    </div> 
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPopularMovies();
  const paths = (data.results || []).map((movie: Movie) => ({
    params: { id: movie.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const movieId = Number(context.params?.id);
  const movie = await getMovieDetails(movieId);

  return {
    props: {
      movie,
    },
    revalidate: 3600,
  };
}