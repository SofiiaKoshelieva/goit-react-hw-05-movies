import { NavLink } from 'react-router-dom';
import s from './movies.module.css';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? s.activeNav : s.nav)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => (isActive ? s.activeNav : s.nav)}
      >
        Movies
      </NavLink>
    </nav>
  );
}
export default Navigation;
