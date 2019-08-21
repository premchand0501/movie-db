import React from 'react';
import { Div, Heading, P, Button } from './Element';
import { IMovieListProps, IMovieListState, IMovie } from '../interface/IMovieList';
import { Dropdown } from './Dropdown';
import MovieListItem from './MovieListItem';
import { Link } from 'react-router-dom';
import { baseUrl, API_KEY } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

class MovieList extends React.Component<IMovieListProps, IMovieListState> {
  state = {
    filter: '',
    sorting: '',
    currentDropdown: '',
    movieList: [],
    pageNo: 1,
    scrolled: false
  }
  async componentDidMount() {
    if (this.props.isFav) {
      this.setState({
        movieList: this.props.favMovies
      })
    }
    else {
      this.getMovies(this.state.pageNo);
    }
    document.querySelector('.App')!.addEventListener('scroll', (e: Event) => {
      const el: HTMLElement = e.target as HTMLElement;
      const flag = el.scrollTop >= 100;
      if (flag !== this.state.scrolled) {
        this.setState({
          scrolled: flag
        })
      }
    })
  }
  async getMovies(pageNo: number) {
    const moviesRes = await fetch(`${baseUrl}/movie/popular?api_key=${API_KEY}&page=${pageNo}`);
    const movieResults = await moviesRes.json();
    const movies: IMovie[] = await movieResults.results;
    this.setState({
      movieList: [...this.state.movieList, ...movies],
      pageNo: pageNo
    })
  }
  loadMore() {
    const newPageno: number = this.state.pageNo + 1;
    this.getMovies(newPageno);
  }
  componentWillReceiveProps(nextProps: IMovieListProps) {
    if (nextProps.isFav) {
      this.setState({
        movieList: nextProps.favMovies
      })
    }
  }
  scrollTop() {
    document.querySelector('.movie-list')!.scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    return (
      <Div className="container movie-list">
        <Button className={`btn btn-link text-light btn-lg fixed-bottom${this.state.scrolled ? ' d-inline-block' : ' d-none'}`}
          onClick={() => this.scrollTop()}>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </Button>
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
              <React.Fragment>
                {
                  this.state.movieList.map((movie: IMovie, index: number) => (
                    <MovieListItem favMovies={this.props.favMovies} movieData={movie} key={index} addMovieToFav={this.props.updateFavs} />
                  ))
                }
                <Div className="text-center w-100 mb-3">
                  <Button className="btn btn-warning" onClick={() => this.loadMore()}>Load More</Button>
                </Div>
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