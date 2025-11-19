import MovieCard from '../MovieCard';
import { Movie } from '../../types';

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  return (
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
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}