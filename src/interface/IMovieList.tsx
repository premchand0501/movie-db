import { RouteComponentProps } from 'react-router-dom';

export interface IAppProps {

}
export interface IAppStates {
  currentMovieId: number;
  favMovies: IMovie[];
  scrollPos: number;
}
export interface IMovieListProps {
  favMovies: IMovie[];
  isFav: boolean;
  updateFavs(movies: IMovie): void;
}
export interface IMovieListItemProps extends RouteComponentProps<any> {
  movieData: IMovie;
  favMovies: IMovie[];
  addMovieToFav(movie: IMovie): void;
}
export interface IGenre {
  id: number;
  name: string;
}
export interface IMovieListState {
  filter: string;
  sorting: string;
  currentDropdown: string;
  movieList: IMovie[];
  pageNo: number;
  scrolled: boolean;
}
export interface IMovie {
  vote_count: number;
  id: number;
  video: boolean;
  vote_average: number;
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}
export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompanies[];
  production_countries: IProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguages[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ISpokenLanguages {
  iso_639_1: string;
  name: string;
}
export interface IProductionCountries {
  iso_3166_1: string;
  name: string;
}
export interface IProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}
export interface IMovieDetailsState {
  movieDetails: IMovieDetails | null;
  pointerMovementX: number;
  pointerMovementY: number;
  backAnim: boolean;
}
export interface IMovieDetailsProps extends RouteComponentProps<any> {
  favMovies: IMovie[];
  updateFavs(movie: IMovie): void;
}

export interface ISearchProps extends RouteComponentProps<any> {

}

export interface ISearchState {
  query: string;
  results: IMovie[];
}