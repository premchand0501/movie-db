import React from 'react';
import { Div, Heading, P, Button } from './Element';
import { IMovieListProps, IMovieListState, IMovie } from '../interface/IMovieList';
import { Dropdown } from './Dropdown';
import MovieListItem from './MovieListItem';
import { Link } from 'react-router-dom';
import { baseUrl, API_KEY } from '../App';
import { IDropdownMenuItem } from '../interface/IDropdown';

class MovieList extends React.Component<IMovieListProps, IMovieListState> {
  filterDropdownMenuItems: IDropdownMenuItem[] = [
    { id: 'popular', value: 'Popular Movies' },
    { id: 'top_rated', value: 'Top Rated' },
    { id: 'upcoming', value: 'Upcoming' },
    { id: 'now_playing', value: 'Now Playing' }
  ]
  state = {
    filter: '',
    sorting: '',
    currentDropdown: '',
    movieList: [],
    pageNo: 1,
    totalPages: 1,
    scrolled: false,
  }
  async componentDidMount() {
    if (this.props.isFav) {
      this.setState({
        movieList: this.props.favMovies
      })
    }
    else {
      const defaultFilter = this.filterDropdownMenuItems[0].id;
      this.getMovies(this.state.pageNo, defaultFilter);
    }
  }
  async getMovies(pageNo: number, filter: string) {
    const moviesRes = await fetch(`${baseUrl}/movie/${filter}?api_key=${API_KEY}&page=${pageNo}`);
    const movieResults = await moviesRes.json();
    const movies: IMovie[] = await movieResults.results;
    let totalPages: number = movieResults.hasOwnProperty('total_pages') ? movieResults.total_pages : 1;

    let prevMovies: IMovie[] = [];

    if (this.state.filter === filter) {
      prevMovies = [...this.state.movieList, ...movies];
    }
    else {
      prevMovies = [...movies];
    }
    this.setState({
      movieList: prevMovies,
      pageNo: pageNo,
      filter: filter,
      totalPages: totalPages
    })
  }
  loadMore() {
    const newPageno: number = this.state.pageNo + 1;
    this.getMovies(newPageno, this.state.filter);
  }
  componentWillReceiveProps(nextProps: IMovieListProps) {
    console.log(this.props.isFav)
    if (nextProps.isFav) {
      this.setState({
        movieList: nextProps.favMovies
      })
    }
  }
  onItemSelect(item: IDropdownMenuItem) {
    console.log(item);
    this.getMovies(1, item.id);
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
              <Div className="col col-12 col-md-7 d-flex align-items-center justify-content-end">
                <Dropdown currentState={this.state.currentDropdown === 'Popular Movies'}
                  onItemSelect={(item: IDropdownMenuItem) => this.onItemSelect(item)}
                  menuAlignment="right" menuItems={this.filterDropdownMenuItems}>
                </Dropdown>
                {/* <Dropdown currentState={this.state.currentDropdown === 'Sort By'}
                  menuAlignment="right" menuItems={['Popular Movies', 'Recent', 'Highest Rated']}>
                </Dropdown> */}
              </Div>
            )
          }

        </Div>
        <Div className="row">
          {
            this.state.movieList.length > 0 ? (
              <React.Fragment>
                {
                  this.state.movieList.map((movie: IMovie, index: number) => (
                    <MovieListItem favMovies={this.props.favMovies} movieData={movie} key={index} addMovieToFav={this.props.updateFavs} />
                  ))
                }
                {
                  (!this.props.isFav) ? (
                    <Div className={`text-center w-100 mb-3${this.state.pageNo < this.state.totalPages ? ' d-inline-block' : ' d-none'}`}>
                      <Button className="btn btn-warning" onClick={() => this.loadMore()}>Load More</Button>
                    </Div>) : ('')
                }
              </React.Fragment>
            ) :
              (
                <Div className="col">
                  <P>{this.props.isFav ? 'You have not added any movies here.' : 'Loading...'}</P>
                  {this.props.isFav ? <Link to="/" className="btn btn-primary">Explore</Link> : ''}
                </Div>
              )
          }
        </Div>
      </Div>
    );
  }
}
export default MovieList;