import React, { Fragment, Component } from 'react';
import './searchBar.css';

export default class SearchBar extends Component {

  render() {
    return(
      <Fragment>
        <div className="searchBar">
          <input
            type="text"
            placeholder="Enter address of the school"
            className="searchBarInput"
          ></input>
          <i className="fas fa-search"></i>
        </div>

      </Fragment>
    )
  }
}