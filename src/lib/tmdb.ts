const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  throw new Error('TMDB_API_KEY is not defined. Please set it in your .env.local file.');
}
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies(page = 1, totalPagesToFetch = 20) {
  let allMovies: any[] = [];
  let currentPage = page;
  let reachedLastPage = false;

  const BATCH_SIZE = 5;
  
  for (let batchStart = 0; batchStart < totalPagesToFetch && !reachedLastPage; batchStart += BATCH_SIZE) {
    const batchEnd = Math.min(batchStart + BATCH_SIZE, totalPagesToFetch);
    const batchPromises = [];
    
    for (let i = batchStart; i < batchEnd && !reachedLastPage; i++) {
      const pageToFetch = currentPage + i;
      batchPromises.push(
        fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageToFetch}`
        ).then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch page ${pageToFetch}: ${response.statusText}`);
          }
          return response.json();
        }).catch((error) => {
          console.error(`Error fetching page ${pageToFetch}:`, error);
          return null; 
        })
      );
    }

    const batchResults = await Promise.all(batchPromises);
    
    for (const data of batchResults) {
      if (!data || !data.results) {
        continue;
      }
      
      if (Array.isArray(data.results)) {
        allMovies = allMovies.concat(data.results);
      }
      
      if (data.page && data.total_pages && data.page >= data.total_pages) {
        reachedLastPage = true;
        break;
      }
    }
    
    if (batchEnd < totalPagesToFetch && !reachedLastPage) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  const uniqueMovies = allMovies.filter((movie, index, self) => 
    index === self.findIndex((m) => m.id === movie.id)
  );

  return { results: uniqueMovies };
}

export async function getTopRatedMovies(page = 1, totalPagesToFetch = 5) {
  let allMovies: any[] = [];
  for (let i = 1; i <= totalPagesToFetch; i++) {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page + i - 1}`,
      { cache: 'no-store' }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    allMovies = allMovies.concat(data.results);
    if (data.page >= data.total_pages) break;
  }
  return { results: allMovies };
}

export async function getMovieDetails(movieId: number) {
  const movieResponse = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
    { cache: 'no-store' }
  );
  if (!movieResponse.ok) {
    throw new Error(`Failed to fetch movie details: ${movieResponse.statusText}`);
  }
  const movieDetails = await movieResponse.json();

  const creditsResponse = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
    { cache: 'no-store' }
  );
  if (!creditsResponse.ok) {
    throw new Error(`Failed to fetch credits: ${creditsResponse.statusText}`);
  }
  const credits = await creditsResponse.json();

  const videosResponse = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
    { cache: 'no-store' }
  );
  if (!videosResponse.ok) {
    throw new Error(`Failed to fetch videos: ${videosResponse.statusText}`);
  }
  const videos = await videosResponse.json();

  return { ...movieDetails, credits, videos };
}