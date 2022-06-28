import { Link } from 'react-router-dom';
import s from '../components/movies.module.css';
function TrendingFilms({ films }) {
  return (
    <>
      <h1>Trending films</h1>
      <ul>
        {films.map(({ id, original_title }) => (
          <li key={id} className={s.film}>
            <Link
              to={`movies/${id}`}
              className={s.link}
              state={{ pathname: '/' }}
            >
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
function RenderFilms({ films, query }) {
  return (
    <>
      <ul>
        {films.map(({ id, original_title }) => (
          <li key={id} className={s.film}>
            <Link
              to={`${id}`}
              className={s.link}
              state={{ pathname: `/movies?query=${query}` }}
            >
              {original_title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { TrendingFilms, RenderFilms };
