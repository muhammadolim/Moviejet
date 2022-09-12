// Base URL
const key = `?api_key=${process.env.REACT_APP_API_KEY}`;
const base_url = "https://api.themoviedb.org/3/";
const image_url = "https://image.tmdb.org/t/p/";

const trending = `trending/movie/week`;
const genres = `genre/movie/list`;

export const trendingMoviesURL = () => `${base_url}${trending}${key}`;

export const imageMovieURL = (size, image) => `${image_url}${size}${image}`;

export const genreListURL = () => `${base_url}${genres}${key}`;

export const movieListURL = (list_name) =>
    `${base_url}movie/${list_name}${key}`;

export const movieDetailsURL = (movie_id) =>
    `${base_url}movie/${movie_id}${key}`;

export const movieVideosURL = (movie_id) =>
    `${base_url}movie/${movie_id}/videos${key}`;

export const searchMovieURL = (query) =>
    `${base_url}search/movie${key}&query=${query}`;
