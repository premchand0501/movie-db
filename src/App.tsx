import React from 'react';
import './App.scss';
import { Header } from './component/Header';
import MovieList from './component/MovieList';

class App extends React.Component {
  state = {
    currentMovieId: -1
  }
  getMovieDetails = (id: number) => {
    this.setState({
      currentMovieId: id
    }, () => console.log(this.state.currentMovieId))
  }
  render() {
    return (
      <div className="App">
        <Header />
        <MovieList getMovieDetails={this.getMovieDetails} />
      </div>
    );
  }
}

export default App;