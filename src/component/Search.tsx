import React from 'react';
import { Div, Form, Input, Button, Span, List, ListItem, Img, Heading, P, Small } from './Element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { ISearchProps, ISearchState, IMovie } from '../interface/IMovieList';
import { baseUrl, API_KEY, genreList } from '../App';
import { withRouter } from 'react-router';

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      query: '',
      results: []
    }
  }
  async handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query: string = e.target.value;
    if (query.length > 2) {
      const results: IMovie[] = await this.searchQuery(query);
      this.setState({
        results: results
      });
    }
    this.setState({
      query: query
    })
  }
  async searchQuery(query: string): Promise<IMovie[]> {
    const resultRes = await fetch(`${baseUrl}/search/movie?api_key=${API_KEY}&query=${query}`);
    const results = await resultRes.json();
    console.log(results);
    return results['results'];
  }
  render() {
    return (
      <Div className="container-fluid searchPage">
        <Div className="container">
          <Form>
            <Div className="input-group input-group-lg">
              <Input type="text" placeholder="Search movies here" className="form-control border-0"
                onChange={(e) => this.handleChange(e)} value={this.state.query} />
              <Span className="input-group-append">
                <Button className="btn btn-light border-0"><FontAwesomeIcon icon={faSearch} /></Button>
              </Span>
            </Div>
          </Form>
          {
            this.state.results.length > 0 ? (
              <List className="list-group mt-3 mb-3">
                {
                  this.state.results.map((res: IMovie, index: number) => (
                    <ListItem className="list-group-item text-dark" key={index}
                      onClick={() => this.props.history.push(`/details/${res.id}`)}>
                      <Img src={res.poster_path ? `http://image.tmdb.org/t/p/w200/${res.poster_path}` : require('../assets/img/movie_placeholder.png')} />
                      <Div className="details">
                        <Heading datatype="h4">{res.title}</Heading>
                        <Span>
                          <Span>
                            {genreList.filter(ge => ge.id === res.genre_ids[0])[0] && genreList.filter(ge => ge.id === res.genre_ids[0])[0].name}
                          </Span>
                          <Span className="ml-2 mr-2" style={{ fontSize: '0.5rem' }}>
                            <FontAwesomeIcon icon={faCircle} />
                          </Span>
                          {res.vote_average}
                          <Span className="ml-1" style={{ fontSize: '0.625rem' }}>
                            <FontAwesomeIcon icon={faStar} />
                          </Span>
                        </Span>
                        <P><Small>{res.overview.slice(0, 97) + '...'}</Small></P>
                      </Div>
                    </ListItem>
                  ))
                }
              </List>
            ) : ('')
          }
        </Div>
      </Div>
    )
  }
}
export default withRouter(Search);