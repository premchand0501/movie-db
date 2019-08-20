import React from 'react';
import { Div, Heading } from './Element';
import { IMovieListProps, IMovieListState, IMovie, IGenre } from '../interface/IMovieList';
import { Dropdown } from './Dropdown';
import MovieListItem from './MovieListItem';

export const API_KEY = "f041ac01899ba8cce1bda2c8f62a1965";
export const baseUrl: string = 'https://api.themoviedb.org/3';

export let genreList: IGenre[] = [];

class MovieList extends React.Component<IMovieListProps, IMovieListState> {
  state = {
    filter: '',
    sorting: '',
    currentDropdown: '',
    movieList: []
  }

  async componentDidMount() {
    if (this.props.isFav) {
      this.setState({
        movieList: [...this.props.favMovies]
      })
    }
    else {
      const genreRes = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      const genres = await genreRes.json();
      genreList = genres['genres'];
      const moviesRes = await fetch(`${baseUrl}/movie/popular?api_key=${API_KEY}`);
      const movieResults = await moviesRes.json();
      const movies: IMovie[] = await movieResults.results;
      this.setState({
        movieList: [...this.state.movieList, ...movies]
      })
    }
  }
  render() {
    return (
      <Div className="container movie-list">
        <Div className="row mb-3">
          <Div className="col col-12 col-md-5 d-flex align-items-center justify-content-between">
            <Heading datatype="h1" className="m-0">{this.props.isFav ? 'Favourites' : 'Popular Movies'}</Heading>
          </Div>
          {
            this.props.isFav ? ('') : (
              <Div className="col col-12 col-md-7 d-flex align-items-center justify-content-between">
                <Dropdown currentState={this.state.currentDropdown === 'Popular Movies'}
                  menuAlignment="right" menuItems={['Popular Movies', 'Recent', 'Highest Rated']}>
                </Dropdown>
                <Dropdown currentState={this.state.currentDropdown === 'Sort By'}
                  menuAlignment="right" menuItems={['Popular Movies', 'Recent', 'Highest Rated']}>
                </Dropdown>
              </Div>
            )
          }

        </Div>
        <Div className="row">
          {
            this.state.movieList.length > 0 ? (
              this.state.movieList.map((movie: IMovie, index: number) => (
                <MovieListItem favMovies={this.props.favMovies} movieData={movie} key={index} addMovieToFav={this.props.updateFavs} />
              ))
            ) :
              (
                <Div className="col">You have not added any movies here.</Div>
              )
          }
        </Div>
      </Div>
    );
  }
}
export default MovieList;