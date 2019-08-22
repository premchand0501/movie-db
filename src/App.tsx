import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { LocationState } from 'history';
import './App.scss';
import Header from './component/Header';
import MovieList from './component/MovieList';
import MovieDetails from './component/MovieDetails';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { IMovie, IAppStates, IAppProps, IGenre } from './interface/IMovieList';
import Search from './component/Search';
import { Div, Button } from './component/Element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

export const API_KEY = "f041ac01899ba8cce1bda2c8f62a1965";
export const baseUrl: string = 'https://api.themoviedb.org/3';

export let genreList: IGenre[] = [];

class App extends React.Component<IAppProps, IAppStates> {
  state = {
    currentMovieId: -1,
    favMovies: [],
    scrollPos: 0,
    scrolled: false
  }
  async componentDidMount() {
    const genreRes = await fetch(`${baseUrl}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const genres = await genreRes.json();
    genreList = genres['genres'];

    window!.addEventListener('scroll', (e: Event) => {
      const el: Document = e.target as Document;
      const flag = el!.scrollingElement!.scrollTop >= 100;
      if (flag !== this.state.scrolled) {
        this.setState({
          scrolled: flag
        })
        console.log(flag);
      }
    })
    const localFavMovies: any = localStorage.getItem('favMovies');
    if (localFavMovies) {
      const favMovies: any = JSON.parse(localFavMovies);
      if (typeof favMovies === 'object' && (favMovies as IMovie[]).length > 0) {
        this.setState({
          favMovies: favMovies
        })
      }
    }
  }
  scrollTop() {
    document.querySelector('html')!.scrollIntoView({ behavior: 'smooth' });
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
      localStorage.setItem('favMovies', JSON.stringify(removedRemaining));
    }
    else {
      const newFavMovies: IMovie[] = [...this.state.favMovies, movie];
      this.setState({
        favMovies: [...newFavMovies]
      })
      localStorage.setItem('favMovies', JSON.stringify(newFavMovies));
    }
  }
  render() {
    return (
      <Div className="App" style={{ overflowY: this.state.currentMovieId >= 0 ? 'hidden' : 'auto' }}>
        <Button className={`btn btn-link text-light btn-lg fixed-bottom${this.state.scrolled ? ' d-inline-block' : ' d-none'}`}
          onClick={() => this.scrollTop()}>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </Button>
        <HashRouter>
          <Route render={({ location }: LocationState) => (
            <React.Fragment>
              <Header favs={this.state.favMovies.length} />
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames={{ appear: 'd-none', enter: '', exit: 'fadeDown' }}
                  timeout={{ exit: 550 }}>
                  <Switch location={location}>
                    <Route exact path="/" render={() => (
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

        </HashRouter>
      </Div>
    );
  }
}

export default App;