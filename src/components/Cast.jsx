import ApiService from './ApiService';
import { useEffect, useState } from 'react';
import s from '../components/movies.module.css';
const apiService = new ApiService();
export default function Cast({ movieId }) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    apiService.fetchCastById(movieId).then(data => {
      setResponse(data.data.cast);
    });
  }, [movieId]);
  if (response != null) {
    if (response.length === 0) {
      return <h1>No Cast</h1>;
    } else {
      return (
        <ul>
          {response.map(({ character, profile_path, id, name }) => {
            return (
              <li key={id}>
                <img
                  className={s.image}
                  src={'https://image.tmdb.org/t/p/w500/' + profile_path}
                  alt=""
                />
                <p>{name}</p>
                <p>Character:{character}</p>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}
