import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LocationState } from 'history';
import './App.scss';
import Header from './component/Header';
import MovieList from './component/MovieList';
import MovieDetails from './component/MovieDetails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IMovie, IAppStates, IAppProps, IGenre } from './interface/IMovieList';
import Search from './component/Search';
import { Div } from './component/Element';

export const API_KEY = "f041ac01899ba8cce1bda2c8f62a1965";
export const baseUrl: string = 'https://api.themoviedb.org/3';

export let genreList: IGenre[] = [];

class App extends React.Component<IAppProps, IAppStates> {
  state = {
    currentMovieId: -1,
    favMovies: [],
    scrollPos: 0
  }
  async componentDidMount() {
    const genreRes = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = await genreRes.json();
    genreList = genres['genres'];
  }
  getMovieDetails = (id: number) => {
    this.setState({
      currentMovieId: id
    })
  }
  goBack() {
    this.setState({
      currentMovieId: -1
    })
  }
  updateFavs(movie: IMovie) {
    const exitsMovie: IMovie[] = this.state.favMovies;
    if (exitsMovie.filter(item => item.id === movie.id).length > 0) {
      const removedRemaining: IMovie[] = exitsMovie.filter(item => item.id !== movie.id);
      this.setState({
        favMovies: [...removedRemaining]
      });
    }
    else {
      const newFavMovies: IMovie[] = [...this.state.favMovies, movie];
      this.setState({
        favMovies: [...newFavMovies]
      })
    }
  }
  render() {
    return (
      <Div className="App" style={{ overflowY: this.state.currentMovieId >= 0 ? 'hidden' : 'auto' }}>
        <Router>
          <Route render={({ location }: LocationState) => (
            <React.Fragment>
              <Header favs={this.state.favMovies.length} />
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames={{ appear: 'd-none', enter: '', exit: 'fadeDown' }}
                  timeout={{ exit: 550 }}>
                  <Switch location={location}>
                    <Redirect path="/" to="/listing" exact />
                    <Route path="/listing" render={() => (
                      <MovieList favMovies={this.state.favMovies} isFav={false}
                        updateFavs={(movie: IMovie) => this.updateFavs(movie)} />)
                    } />
                    <Route path="/favourites" render={() => <MovieList favMovies={this.state.favMovies} isFav={true} updateFavs={(movie: IMovie) => this.updateFavs(movie)} />} />
                    <Route path="/details/:id" render={() => <MovieDetails favMovies={this.state.favMovies} updateFavs={(movie: IMovie) => this.updateFavs(movie)} />} />
                    <Route path="/search" component={Search} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </React.Fragment>
          )}
          />

        </Router>
      </Div>
    );
  }
}

export default App;