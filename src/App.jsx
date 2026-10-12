import { useEffect, useState } from 'react'
import './App.css'
import {useDebounce} from 'react-use'
import { updateAppwriteSearchTerm, getTopAppwriteSearchTerms} from './AppWrite'
import Search from './components/Search'
import Spinner from './components/Spinner'
import Oops from './components/Oops'
import Card from './components/Card'
import Suggested from './components/Suggested'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_API_URL = 'https://api.themoviedb.org/3'
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trendingMoviesData, setTrendingMoviesData] = useState([]);

  useDebounce(() => setDebouncedSearchText(searchText), 500, [searchText]);

  const loadMovies = async function () {
    setLoading(true);

    try {
      const endpoint = debouncedSearchText.trim() ?
      `${BASE_API_URL}/search/movie?query=${encodeURIComponent(debouncedSearchText)}` :
      `${BASE_API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      if (!data.results.length) {
        throw new Error(`No movies found for '${debouncedSearchText.trim()}'`);
      } 
      setMoviesData(data.results || []);
      if (debouncedSearchText.trim()){
        await updateAppwriteSearchTerm(debouncedSearchText.trim(), data.results[0]);
      }
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage((error.message.startsWith("No movies found") ? error.message : "Failed to fetch movies"));
    } finally {
      setLoading(false);
    }
  }

  const loadTrendingMovies = async function () {
    try {
      const response = await getTopAppwriteSearchTerms();
      console.log("Trending movies response:", response);
      if (response.length == 0) {
        throw new Error('Failed to fetch trending movies');
      }
      setTrendingMoviesData(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    loadMovies();
  }, [debouncedSearchText]);

  return (
    <div>
      <Search searchText={searchText} setSearchText={setSearchText} />
      {searchText.trim() ? (
        <h2 className="moviesTitle">Results for &quot;{searchText.trim()}&quot;</h2>
      ) : (
        <>
          <Suggested movies={trendingMoviesData} />
          <h2 className="moviesTitle">Discover movies</h2>
        </>
      )}
      {isLoading ? (<Spinner />) : errorMessage ? (<Oops message={errorMessage} />) : (
        <div className="movies">
        {moviesData.map((movie) => (
          <Card
            key={movie.id}
            movieName={movie.title}
            movieRating={(movie.vote_average > 0) ? movie.vote_average.toFixed(1) : "N/A"}
            imgPath={movie.poster_path}
          />
        ))}
      </div>
      )}
    </div>
  )
}

export default App
