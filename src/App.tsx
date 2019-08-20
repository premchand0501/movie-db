import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LocationState } from 'history';
import './App.scss';
import Header from './component/Header';
import MovieList from './component/MovieList';
import MovieDetails from './component/MovieDetails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IMovie, IAppStates, IAppProps } from './interface/IMovieList';

class App extends React.Component<IAppProps, IAppStates> {
  state = {
    currentMovieId: -1,
    favMovies: []
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
  updateFavs(movies: IMovie) {
    // const exitsMovie: IMovie[] = this.state.favMovies.filter(item => item.id === movies.id);
    const newFavMovies: IMovie[] = [...this.state.favMovies, movies];
    this.setState({
      favMovies: newFavMovies
    })
  }
  render() {
    return (
      <div className="App" style={{ overflowY: this.state.currentMovieId >= 0 ? 'hidden' : 'auto' }}>
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
                    <Route path="/listing" render={() => <MovieList favMovies={this.state.favMovies} isFav={false} updateFavs={(movies: IMovie) => this.updateFavs(movies)} />} />
                    <Route path="/favourites" render={() => <MovieList favMovies={this.state.favMovies} isFav={true} updateFavs={(movies: IMovie) => this.updateFavs(movies)} />} />
                    <Route path="/details/:id" component={MovieDetails} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </React.Fragment>
          )}
          />

        </Router>
      </div>
    );
  }
}

export default App;