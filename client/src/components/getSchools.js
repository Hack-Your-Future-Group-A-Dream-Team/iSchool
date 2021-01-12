import React, { Fragment, Component } from "react";
import axios from "axios";
import "./getSchools.css";
import SearchBar from "./searchBar";
import SchoolBlock from "./SchoolBlock";

export default class Schools extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      commentsList: [],
    };
  }

  componentDidMount() {
    axios.get("/schools").then((res) => {
      // get all school
      const allSchools = res.data;
      //console.log(allSchools)

      // filter school and set state
      //  const filterSchools = allSchools.filter(school => school.network == 'Catholic Network' && school.areas == 'Vocational');

      this.setState({
        //data: filterSchools
        data: allSchools,
      });
    });
  }

  render() {
    return (
      <div className="searchField">
        <SearchBar />
        <div className="schoolList">
          {this.state.data.map((data) => {
            return (
              <Fragment key={data._id}>
                <SchoolBlock details={data}></SchoolBlock>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
