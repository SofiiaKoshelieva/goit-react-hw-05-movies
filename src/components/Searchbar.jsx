import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ImSearch } from 'react-icons/im';
import { RenderFilms } from './RenderFilms';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './movies.module.css';
import ApiService from './ApiService';
const apiService = new ApiService();
export default function Searchbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setValue] = useState('');
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    const prevSearch = new URLSearchParams(location.search).get('query');
    setValue(prevSearch);
    apiService.query = prevSearch;
    apiService.fetchMoviesByName().then(data => {
      if (location.search && !films) {
        if (data.data.results.length > 0) {
          setFilms(data.data.results);
          setStatus('resolved');
        }
      }
    });
  }, [films, location.search]);

  function onInputChange(e) {
    setValue(e.currentTarget.value.toLowerCase());
  }
  function onFormSubmit(e) {
    setStatus('pending');
    e.preventDefault();
    if (inputValue.trim() === '') {
      Notiflix.Notify.warning('Enter a request!!!!!!!');
      return;
    }
    apiService.query = inputValue;
    apiService.fetchMoviesByName().then(data => {
      if (data.data.results.length > 0) {
        setFilms(data.data.results);
        setStatus('resolved');
        navigate(`?query=${inputValue}`);
      } else {
        setStatus('rejected');
      }
    });
    setValue('');
    e.target.reset();
  }
  return (
    <>
      <form className={s.searchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={s.searchFormButton}>
          <ImSearch />{' '}
        </button>

        <input
          className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          onChange={onInputChange}
        />
      </form>
      {status === 'resolved' && (
        <RenderFilms films={films} query={inputValue} />
      )}
    </>
  );
}
