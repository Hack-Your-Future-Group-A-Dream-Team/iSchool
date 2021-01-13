import React, { Fragment, Component } from "react";
import axios from "axios";
import "./getSchools.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { AuthContext } from "../Context/AuthContext";
import SchoolBlock from "./SchoolBlock";

export default class Schools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      address: "",
      commentsList: [],
    };

    this.sendRating = this.sendRating.bind(this);
  }

  static contextType = AuthContext;

  componentDidMount() {
    axios.get("/schools").then((res) => {
      // get all school from database
      const allSchools = res.data;
      console.log(allSchools);

      this.setState({
        data: allSchools,
      });
    });
  }

  // search with address

  handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    this.setState({
      address: value,
    });

    fetch(`/closestschools?lng=${latLng.lng}&lat=${latLng.lat}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data,
        });
      });
  };

  handleChange = async (value) => {
    if (value === "") {
      await this.setState({
        data: [],
      });
    }
    await this.setState({
      address: value,
    });
  };
  // send rating
  sendRating(e) {
    e.preventDefault();
    const formEvent = e.target;

    const dataForm = new FormData(formEvent);
    const dataFormResult = Object.fromEntries(dataForm.entries());
    console.log(dataFormResult);

    axios
      .post("/schools/rating", {
        score: dataFormResult.score,
        schoolid: dataFormResult.schoolid,
        userid: dataFormResult.userid,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const user = this.context;
    console.log(user);
    console.log(user.user._id);

    // filter schools by aside filters
    let filteredSchools = this.state.data;

    if (this.props.getFilter) {
      Object.entries(this.props.getFilter).forEach(([key, value]) => {
        if (value) {
          if (key === "languageClasses") {
            value = Boolean(value);
          }

          if (key === "rating") {
            value = Number(value);
          }

          filteredSchools = filteredSchools.filter(
            (school) => school[key] == value
          );
          console.log(filteredSchools, "during");
        }
      });
    }

    return (
      <div className="searchField">
        {console.log(this.state.data)}
        <div>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <div className="searchBar">
                  <input
                    {...getInputProps({
                      placeholder: "Enter address of the school",
                    })}
                    className="searchBarInput"
                  />
                  <i className="fas fa-search"></i>
                </div>
                <div className="suggestions">
                  {loading ? <div>...loading</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#ffff" : "#000051",
                      color: suggestion.active ? "#000051" : "#ffff",
                    };
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, { style })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>

        <div className="schoolList">
          {filteredSchools.map((data) => {
            return (
              <Fragment key={data._id}>
                <SchoolBlock
                  details={data}
                  user={this.context.user._id}
                ></SchoolBlock>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
