import { useState, useEffect } from 'react';
import ApiService from './ApiService';
import { TrendingFilms } from './RenderFilms';
const apiService = new ApiService();
export default function HomePage() {
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    setStatus('pending');

    apiService.fetchMovies().then(({ data }) => {
      if (data.results.length > 0) {
        setFilms(data.results);
        setStatus('resolved');
      } else {
        setStatus('rejected');
      }
    });
  }, []);
  if (status === 'resolved') {
    return <TrendingFilms films={films} />;
  }
}
