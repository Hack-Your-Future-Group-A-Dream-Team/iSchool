import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {AuthContext} from '../Context/AuthContext';
import { withRouter } from 'react-router-dom';

class Schools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      address: ""
    };

    this.sendRating = this.sendRating.bind(this)
  };

  static contextType = AuthContext;
  

  componentDidMount() {
    axios.get('/schools')
        .then(res => {
          // get all school from database
          const allSchools = res.data;
          console.log(allSchools)

          this.setState({       
              data: allSchools
          });
        })
  
  };

// search with address

   handleSelect = async value => {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      this.setState({       
        address: value
    })
 
      fetch(`/closestschools?lng=${latLng.lng}&lat=${latLng.lat}`)
      .then(res=>res.json())
      .then(data=> {this.setState({       
        data: data
    })})
  }

   handleChange = async value =>{
    if(value === ''){
        await this.setState({       
          data: []
      });
    }
    await this.setState({       
      address: value
  })
}
// send rating
  sendRating (e) {
    e.preventDefault();
    const {isAuthenticated} = this.context;
    const {history} = this.props;
    if(isAuthenticated) {
      const formEvent = e.target;
      const dataForm = new FormData(formEvent);
      const dataFormResult = Object.fromEntries(dataForm.entries());
      console.log(dataFormResult);

      axios.post('/schools/rating', {
        score: dataFormResult.score,
        schoolid: dataFormResult.schoolid,
        userid: dataFormResult.userid
      })
      .then(res => {console.log(res)})
      .catch(err => {console.log(err)});
      }else{
        history.push('/login');
      }
    
  }

  render() {
    const {user} = this.context
    
    // filter schools by aside filters
    let filteredSchools = this.state.data;

    if(this.props.getFilter) {
      Object.entries(this.props.getFilter).forEach(([key, value]) => {
        if(value) {
          if(key === "languageClasses") {
            value = Boolean(value);
          }

          if(key === "rating") {
            value = Number(value);
          }
          
          filteredSchools = filteredSchools.filter(school => school[key] == value);
          console.log(filteredSchools, "during");
        }  
      });
    }


    return (
      <div className="searchField">
        {console.log(this.state.data)}
        <div>
          <PlacesAutocomplete  value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>{({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
            <div>
              <div className="searchBar">
                <input {...getInputProps({ placeholder: "Enter address of the school"})} 
                                         className="searchBarInput"/>
                <i  className="fas fa-search"></i>
              </div>
            <div className="suggestions">
                {loading ? <div>...loading</div> : null}
                {suggestions.map(suggestion =>{
                  const style = {
                      backgroundColor: suggestion.active ? "#ffff" : "#000051",
                      color: suggestion.active ? "#000051" : "#ffff",
                  };
                  return (<div key={suggestion.placeId}{...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>);
                })}
            </div>
            </div>)}
          </PlacesAutocomplete>
     </div>

        <div className="schoolList">
          {filteredSchools.map((data)=>{
            return(
              <Fragment>
                <div key={data.id} className="schoolListItem">

                  <div>
                    <p className="schoolName">{data.name}</p>
                    <p className="schoolContact">{data.adress_str}</p>
                    <p className="schoolContact">Email: {data.email}</p>
                    <p className="schoolContact">Phone: {data.phone}</p>
                    <div className="btn-container">
                      <button className="schoolList-btn">Save school</button>
                      <button className="schoolList-btn">Comment</button>
                    </div>
                    <div className="review-container">
                      <p>Give a review:</p> 
                        <form onSubmit={this.sendRating}>
                          <fieldset className="ratingForm">
                            <div className="addRatingStarContainer">
                              <input className="addRatingStar" type="radio" name="score" value="5"
                              id={data._id + '1'}
                              ></input>
                              <label className="addRatingLabel far fa-star" for={data._id + '1'}></label>
                              <input className="addRatingStar" type="radio" name="score" value="4"
                              id={data._id + '2'}
                              ></input>
                              <label className="addRatingLabel far fa-star" for={data._id + '2'}></label>
                              <input className="addRatingStar"  type="radio" name="score" value="3"
                              id={data._id + '3'}
                              ></input>
                              <label className="addRatingLabel far fa-star" for={data._id + '3'}></label>
                              <input className="addRatingStar" type="radio" name="score" value="2"
                              id={data._id + '4'}
                              ></input>
                              <label className="addRatingLabel far fa-star" for={data._id + '4'}></label>
                              <input className="addRatingStar" type="radio" name="score" value="1"
                              id={data._id + '5'}
                              ></input>
                              <label className="addRatingLabel far fa-star" for={data._id + '5'}></label>
                          </div>
                          <div>
                            <input type="hidden" name="schoolid" value={data._id}></input>
                            <input type="hidden" name="userid" value={user? user._id : ""}></input>
                            <input className="sendRating" type="submit" value="Send"></input>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                  
                  <div className="schoolListItem-rightSide">
                    <div className="schoolList-comments">Read Comments</div>
                    <div className="schoolList-rating">Rating: {data.rating}</div>
                  </div>
                  
                </div>
              </Fragment>
            )
          })
        }
          </div>
      </div>
    )
  };
};

export default withRouter(Schools);

