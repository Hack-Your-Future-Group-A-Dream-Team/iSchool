import React, { Fragment, Component } from "react";
import axios from "axios";
import "./getSchools.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { AuthContext } from "../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SchoolBlock from "./SchoolBlock";

export default class Schools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      address: "",
      hasSearchResult: true,
    };

    this.sendRating = this.sendRating.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
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
        if (data.length === 0) {
          this.setState({
            data: data,
            hasSearchResult: false,
          });
        } else {
          this.setState({
            data: data,
            hasSearchResult: true,
          });
        }
      });
  };

  handleChange = async (value) => {
    if (value === "") {
      axios.get("/schools").then((res) => {
        // get all school from database
        const allSchools = res.data;

        this.setState({
          data: allSchools,
          hasSearchResult: true,
        });
      });
    }
    await this.setState({
      address: value,
    });
  };

  //Save button

  saveFavorite(data) {
    console.log(this);
    console.log(this.context.user.listOfSchools);
    //const newFav=this.context.user.listOfSchools.push(data)
    console.log(data);
    axios({
      method: "put",
      url: "/user/favorites",
      data: {
        userid: this.context.user._id,
        listOfSchools: data,
      },
    })
      .then((data) => {
        console.log(data);
        toast.success("Successfully saved");
      })
      .catch((err) => console.log(err));
    console.log(this.context.user);
  }

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
        toast.success("Thank you for sharing your opinion!");
        console.log("new rating: " + JSON.stringify(res.data));
      })
      .catch((err) => {
        toast.error("Something went wrong. Try again.");
        console.log(err);
      });
  }

  render() {
    const user = this.context;
    // console.log(user);
    {
      console.log(user.user._id);
    }

    // filter schools by aside filters
    let filteredSchools = this.state.data;
    
    if (this.props.getFilter) {
      let keysFilter = [];
      let valuesFilter = [];

      Object.entries(this.props.getFilter).forEach(([key, value]) => {
        if (value) {
          if (key === "languageClasses") {
            value = Boolean(value);
          }

          if (key === "rating") {
            value = Number(value);
          }

          // NETWORK FILTER
          if (key === "isCatholicNetwork") {
            key = "network";
            value="Catholic Network";
          }

          if (key === "isMunicipalityNetwork") {
            key = "network";
            value = "Municipality Schools";
          }
          
          if(key === "isPrivateNetwork") {
            key = "network";
            value = "Private schools";
          }
          
          if(key === "isGoNetwork") {
            key = "network";
            value = "GO Network"
          }

          // AREAS FILTER

          if (key === "isGeneralAreas") {
            key = "areas";
            value="General";
          }

          if (key === "isTechnicalAreas") {
            key = "areas";
            value = "Technical";
          }
          
          if(key === "isVocationalAreas") {
            key = "areas";
            value = "Vocational";
          }
          
          if(key === "isArtAreas") {
            key = "areas";
            value = "Art Secondary Education"
          }
          
          keysFilter.push(key);
          valuesFilter.push(value);
 
        }
      });
      let keysFilterUnique = Array.from(new Set(keysFilter));

      console.log(keysFilterUnique, valuesFilter, "return filters");

      filteredSchools = filteredSchools.filter(
        school => {
          let result;
          keysFilterUnique.forEach(el => {            
            let j = school[el] + '';

            result = valuesFilter.includes(j);
            // console.log(result, "school during");  
          })  
          return result;
        });
      
      console.log(filteredSchools, "result");

      toast.success(`We found ${filteredSchools.length} school(s) matches your criteria`);
    };

    return (
      <div className="searchField">
        <ToastContainer />
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
          {!this.state.hasSearchResult && (
            <div className="noResult">
              <h3>
                <i className="fa fa-warning"></i>
                <br />
                Sorry,
                <br />
                No school has been found in the 1 km radius of the address you
                have typed.
                <br />
                For the moment our service area is limited to Ghent region.
              </h3>
            </div>
          )}

          {filteredSchools.length === 0 && this.state.hasSearchResult && (
            <div className="noResult">
              <h3>
                <i className="fa fa-warning"></i> No result has been found for
                these search parameters!
              </h3>
            </div>
          )}

          {filteredSchools.map((data) => {
            return (
              <Fragment key={data._id}>
                <SchoolBlock
                  details={data}
                  userid={this.context.user._id}
                  sendRating={this.sendRating}
                  saveFavorite={this.saveFavorite}
                ></SchoolBlock>
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
