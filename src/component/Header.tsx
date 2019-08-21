import React from 'react';
import '../App.scss';
import { Div, Span } from './Element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { IHeaderProps } from '../interface/IHeaderProps';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const Header = (props: IHeaderProps) => {
  return (
    <Div className="navbar navbar-expand-lg fixed-top">
      <Div className="container-fluid">
        <Link className="navbar-brand btn btn-link" to="/">
          <FontAwesomeIcon icon={faDatabase} />&nbsp;MovieDB
        </Link>
        <Div className="navbar-right">
          <Link className="nav-item btn btn-link ml-2" to="/favourites">
            <FontAwesomeIcon icon={faHeart} />
            <Span className="ml-2">My Favourites</Span>
            {props.favs > 0 ? <Span className="badge badge-warning ml-2">{props.favs}</Span> : ''}
          </Link>
          <Link className="nav-item btn btn-link ml-2" to="/search">
            <FontAwesomeIcon icon={faSearch} />
            <Span className="ml-2">Search</Span>
          </Link>
        </Div>
      </Div>
    </Div>
  );
}
export default withRouter(Header);