import { lazy, Suspense } from 'react';
import Navigation from './Navigation';

import { Route, Routes } from 'react-router-dom';
const HomePage = lazy(() =>
  import('./Homepage.jsx' /*webpackChunkName: 'Home'*/)
);
const ChosenFilm = lazy(() =>
  import('./ChosenFilm.jsx' /*webpackChunkName: 'ChosenFilm'*/)
);
const MoviesPage = lazy(() =>
  import('./MoviesPage.jsx' /*webpackChunkName: 'MoviesPage'*/)
);
export default function Movies() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<h3>Loading...</h3>}>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/movies" element={<MoviesPage />}></Route>
            <Route path="/movies/:movieId/*" element={<ChosenFilm />}></Route>
          </Routes>{' '}
        </Suspense>
      </main>
    </>
  );
}
