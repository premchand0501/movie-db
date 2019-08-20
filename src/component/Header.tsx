import React from 'react';
import '../App.scss';
import { Div, Button, Span } from './Element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { IHeaderProps } from '../interface/IHeaderProps';
import { withRouter } from 'react-router';

const Header = (props: IHeaderProps) => {
  return (
    <Div className="navbar navbar-expand-lg fixed-top">
      <Div className="container-fluid">
        <Button className="navbar-brand btn btn-link" onClick={() => props.history.push('/')}>
          <FontAwesomeIcon icon={faDatabase} />&nbsp;MovieDB
        </Button>
        <Div className="navbar-right">
          <Button className="nav-item btn btn-link ml-2" onClick={() => props.history.push('/favourites')}>
            <FontAwesomeIcon icon={faHeart} />
            <Span className="ml-2">My Favourites
              {
                props.favs > 0 ? <Span className="badge badge-warning ml-2">{props.favs}</Span> : ''
              }
            </Span>
          </Button>
          <Button className="nav-item btn btn-link ml-2" >
            <FontAwesomeIcon icon={faSearch} />
            <Span className="ml-2">Search</Span>
          </Button>
        </Div>
      </Div>
    </Div>
  );
}
export default withRouter(Header);