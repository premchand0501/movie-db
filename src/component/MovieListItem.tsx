import React from 'react';
import { Div, Heading, P, Span, Button } from "./Element";
import { IMovieListItemProps } from '../interface/IMovieList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { genreList } from './MovieList';

export const MovieListItem = (props: IMovieListItemProps) => (
  <Div className="col col-6 col-md-4 col-sm-4">
    <Div className="card" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w500/${props.movieData.poster_path})` }}
      onClick={() => props.getMovieDetails(props.movieData.id)}>
      <Div className="card-body">
        <Div className="text-right w-100">
          <Button className={'btn btn-link text-light'}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
            }}><FontAwesomeIcon icon={faHeart} /></Button>
        </Div>
        <Div>
          <Heading datatype="h5">{props.movieData.title}</Heading>
          <P className="rating-genre">
            {genreList.filter(ge => ge.id === props.movieData.genre_ids[0])[0].name}
            <Span className="ml-2 mr-2" style={{ fontSize: '0.5rem' }}>
              <FontAwesomeIcon icon={faCircle} />
            </Span>
            {props.movieData.vote_average}
            <Span className="ml-1" style={{ fontSize: '0.625rem' }}>
              <FontAwesomeIcon icon={faStar} />
            </Span>
          </P>
        </Div>
      </Div>
    </Div>
  </Div>
)