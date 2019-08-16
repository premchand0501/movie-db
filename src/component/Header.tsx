import React from 'react';
import '../App.scss';
import { Div, Button, Span } from './Element';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faDatabase } from '@fortawesome/free-solid-svg-icons';

export const Header = () => {
  return (
    <Div className="navbar navbar-expand-lg fixed-top">
      <Div className="container-fluid">
        <Button className="navbar-brand btn btn-link">
          <FontAwesomeIcon icon={faDatabase} />&nbsp;MovieDB
        </Button>
        <Div className="navbar-right">
          <Button className="nav-item btn btn-link ml-2" >
            <FontAwesomeIcon icon={faHeart} />
            <Span className="ml-2">My Favourites</Span>
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