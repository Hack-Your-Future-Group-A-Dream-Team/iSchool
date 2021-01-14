import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';
import SearchBar from './searchBar'

import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {AuthContext} from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Schools extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  };
  
  componentDidMount() {
    axios.get('/schools')
        .then(res => {
          // get all school
          const allSchools = res.data;
          console.log(allSchools)

          // filter school and set state
          const filterSchools = allSchools.filter(school => school.network == 'Catholic Network' && school.areas == 'Vocational');

          this.setState({       
              data: filterSchools
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

//Save button

saveFavorite(data){
  console.log(this.context.user.listOfSchools)
  //const newFav=this.context.user.listOfSchools.push(data)
  console.log(data)
  axios({method:'put', 
            url:'/user/favorites', 
            data:{
                    userid:this.context.user._id,
             listOfSchools:data
            }
        }
  )
  .then(data=>{console.log(data); toast.success("Successfully saved")})
  .catch(err=>console.log(err))
  console.log(this.context.user)
}

// send rating
  sendRating (e) {
    e.preventDefault();
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
  }


  render() {
    
    const user = this.context
    // console.log(user);
   {   console.log(user.user._id)};

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
         <ToastContainer />
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
          {this.state.data.map((data)=>{
            return(
              <Fragment>
                <div key={data.id} className="schoolListItem">

                  <div>
                    <p className="schoolName">{data.name}</p>
                    <p className="schoolContact">{data.adress_str}</p>
                    <p className="schoolContact">Email: {data.email}</p>
                    <p className="schoolContact">Phone: {data.phone}</p>
                    <div className="btn-container">
                      <button className="schoolList-btn" onClick={() => this.saveFavorite(data)}>Save school</button>
                      <button className="schoolList-btn">Comment</button>
                    </div>
                    <div className="review-container">
                      Give a review: 
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
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



