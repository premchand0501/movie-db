import React from 'react';
import { Div, Heading, P, Span, Img, Button } from './Element';
import { IMovieDetailsProps, IMovieDetailsState, IMovieDetails, IGenre } from '../interface/IMovieList';
import { baseUrl, API_KEY } from './MovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faStar, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';

class MovieDetails extends React.Component<IMovieDetailsProps, IMovieDetailsState> {
  state: IMovieDetailsState = {
    movieDetails: null,
    pointerMovementX: 0,
    pointerMovementY: 0,
    backAnim: false
  }
  async componentDidMount() {
    console.log(this.props.match.params.id);
    const movieRes = await fetch(`${baseUrl}/movie/${this.props.match.params.id}?api_key=${API_KEY}`);
    const movieDetails: IMovieDetails = await movieRes.json();
    this.setState({
      movieDetails: movieDetails
    })
    console.log(movieDetails);
  }
  getGenres(genres: IGenre[]) {
    let genresHtml: JSX.Element[];

    genresHtml = genres.map((ge, index) =>
      (
        <Span key={index}>
          {ge.name}
          {
            index < (genres!.length - 1) ?
              (
                <Span className="ml-2 mr-2" style={{ fontSize: '0.5rem' }}>
                  <FontAwesomeIcon icon={faCircle} />
                </Span>
              ) : ('')
          }
        </Span>
      )
    );
    return genresHtml;
  }
  getMovieRuntime(runtime: number) {
    let hrs = '';
    let min = '';
    hrs = Math.floor(runtime / 60).toString();
    min = Math.abs(runtime % 60).toString();
    return `${hrs}H${min}Min`;
  }
  handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    this.setState({
      pointerMovementX: e.clientX,
      pointerMovementY: e.clientY
    })
  }
  render() {
    return (
      this.state.movieDetails ? (
        <Div className={`container-fluid movie-details fadeUp`}
          onPointerMove={(e) => this.handlePointerMove(e)}
          style={{
            backgroundImage: `url(http://image.tmdb.org/t/p/w500/${this.state.movieDetails!.backdrop_path})`,
            backgroundPosition: `${Math.floor(this.state.pointerMovementX / 100)}% ${Math.floor(this.state.pointerMovementY / 100)}%`,
          }}>
          <Button className="btn btn-link fixed-top backBtn" onClick={this.props.history.goBack}>
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </Button>
          <Div className="row">
            <Div className="container-fluid">
              <Div className="container mt-3 mb-3">
                <Div className="row">
                  <Div className="col col-4">
                    <Img src={`http://image.tmdb.org/t/p/w500/${this.state.movieDetails!.poster_path}`} className="img-fluid poster" />
                  </Div>
                  <Div className="col col-8">
                    <Heading datatype="h1" className="title">
                      {this.state.movieDetails!.title}
                      <Span className="rating">
                        <Span className="text-warning"><FontAwesomeIcon icon={faStar} /></Span>
                        <Span>{this.state.movieDetails.vote_average}</Span>
                      </Span>
                    </Heading>
                    <P>
                      {this.getGenres(this.state.movieDetails.genres)}
                      {
                        (this.state.movieDetails.runtime && this.state.movieDetails.runtime > 0 ?
                          (
                            <React.Fragment>
                              <Span className="ml-2 mr-2" style={{ fontSize: '0.5rem' }}>
                                <FontAwesomeIcon icon={faCircle} />
                              </Span>
                              <Span>{this.getMovieRuntime(this.state.movieDetails.runtime)}</Span>
                            </React.Fragment>
                          ) : (''))
                      }
                    </P>
                    <Div className="text-uppercase">{this.state.movieDetails.spoken_languages.map((lang, ind) => (
                      <Span title={lang.name} key={ind} className="badge badge-dark mr-2">{lang.iso_639_1}&nbsp;</Span>
                    ))}</Div>
                    <Heading datatype="h4" className="mt-3">Introduction</Heading>
                    <P>{this.state.movieDetails.overview}</P>
                  </Div>
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>)
        : (
          <Div className="container m-3">Loading details...</Div>
        )
    );
  }
}
export default withRouter(MovieDetails);