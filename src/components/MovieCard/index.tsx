import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const formattedRating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Link href={`/movies/${movie.id}`} passHref style={{ textDecoration: 'none' }}>
      <div 
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '240px',
          margin: '0',
          borderRadius: 'clamp(10px, 2vw, 12px)',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)', 
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          WebkitTransition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          backgroundColor: '#1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.5)';
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2/3',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 'clamp(8px, 1.5vw, 10px)',
            left: 'clamp(8px, 1.5vw, 10px)',
            backgroundColor: 'rgba(18, 18, 18, 0.9)', 
            backdropFilter: 'blur(10px)',
            color: 'white',
            borderRadius: 'clamp(6px, 1.5vw, 8px)', 
            padding: 'clamp(5px, 1.2vw, 6px) clamp(8px, 1.5vw, 10px)', 
            fontSize: 'clamp(12px, 2vw, 14px)', 
            fontWeight: '700', 
            zIndex: 3, 
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(4px, 1vw, 5px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)', 
          }}>
            <span style={{ color: '#FFD700', textShadow: '0 0 3px rgba(0,0,0,0.5)', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>⭐</span>
            {formattedRating}
          </div>
          
          <img 
            src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/placeholder.jpg'}
            alt={movie.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />

          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{
          padding: 'clamp(12px, 2.5vw, 16px) clamp(10px, 2vw, 12px)',
          backgroundColor: '#1a1a1a',
          minHeight: 'clamp(70px, 12vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <h3 style={{ 
            margin: '0 0 0 0',
            fontSize: 'clamp(15px, 3vw, 18px)', 
            fontWeight: '700',
            lineHeight: '1.3',
            color: '#ffffff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            letterSpacing: '0.3px',
            textDecoration: 'none',
          }}>
            {movie.title}
          </h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', 
          }}>
            <span style={{ 
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              color: '#aaa',
              fontWeight: '500',
            }}>
              {releaseYear}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}