const axios = require('axios').default;
export default class ApiService {
  constructor() {
    this.key = '?api_key=4177e902090c804b976fbf3cfd72131d';
    this.BASE_URL = 'https://api.themoviedb.org';
    this.trending = '/trending/{media_type}/{time_window}';
    this.search = '/search/movie';

    this.movieCreadits = '/movie/{movie_id}/credits';
    this.movieReview = '/movie/{movie_id}/reviews';
    this.searchQuery = '';
  }
  async fetchMovies() {
    const response = await axios.get(
      `${this.BASE_URL}/3/movie/popular${this.key}`
    );
    return response;
  }

  async fetchMoviesById(id) {
    const responceById = await axios.get(
      `${this.BASE_URL}/3/movie/${id}${this.key}`
    );
    return responceById;
  }
  async fetchMoviesByName() {
    const fetchMovieByName = await axios.get(
      `${this.BASE_URL}/3/search/movie/${this.key}&query=${this.searchQuery}`
    );
    return fetchMovieByName;
  }

  async fetchCastById(id) {
    const fetchCastById = await axios.get(
      `${this.BASE_URL}/3/movie/${id}/credits${this.key}`
    );
    return fetchCastById;
  }

  async fetchReviewById(id) {
    const fetchReviewById = await axios.get(
      `${this.BASE_URL}/3/movie/${id}/reviews${this.key}`
    );
    return fetchReviewById;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
