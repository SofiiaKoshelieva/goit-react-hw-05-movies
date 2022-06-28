import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import Cast from './Cast';
// import Review from './Review';
// import Button from './Button';
import { useLocation } from 'react-router-dom';

import s from '../components/movies.module.css';

import ApiService from './ApiService';
const apiService = new ApiService();
const Review = lazy(() =>
  import('./Review.jsx' /*webpackChunkName: 'Review'*/)
);
const Button = lazy(() =>
  import('./Button.jsx' /*webpackChunkName: 'Button'*/)
);
const Cast = lazy(() => import('./Cast.jsx' /*webpackChunkName: 'Cast'*/));
function ChosenFilm() {
  const [response, setResponse] = useState();
  const { movieId } = useParams(null);
  const location = useLocation();

  useEffect(() => {
    apiService.fetchMoviesById(movieId).then(({ data }) => {
      setResponse(data);
    });
  }, [movieId]);
  if (response) {
    return (
      <>
        <hr />
        <div>
          <Link to={location.state}>
            <Button />
          </Link>

          <img
            className={s.image}
            src={'https://image.tmdb.org/t/p/w500/' + response.poster_path}
            alt=""
          />
          <h1>
            {response.title}({response.release_date.slice(0, 4)})
          </h1>
          <p>User score: {Math.round(response.vote_average * 10)}%</p>
        </div>

        <h2>Overview</h2>
        <div>{response.overview}</div>

        <h2>Genres</h2>
        <p>
          {response.genres.map(({ name }) => {
            return `${name} `;
          })}
        </p>
        <hr />

        <p>Additional information</p>
        <ul>
          <li>
            <Link to={'cast'} state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link to={'review'} state={location.state}>
              Review
            </Link>
          </li>
        </ul>
        <hr />
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route path="cast" element={<Cast movieId={movieId} />}></Route>
            <Route path="review" element={<Review movieId={movieId} />}></Route>
          </Routes>
        </Suspense>
      </>
    );
  }
}
export default ChosenFilm;
