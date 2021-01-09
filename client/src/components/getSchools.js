import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';
import SearchBar from './searchBar'


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

  render() {
    return (
      <div className="searchField">
        <SearchBar />
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
                      <button className="schoolList-btn">Save school</button>
                      <button className="schoolList-btn">Add comment</button>
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
                    <div className="schoolList-comments"><a href = "#" onClick = {this.getCommentsList}>Comments({data.rating})</a></div>
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

  getCommentsList = async ()=>{

  //  MONGOBD_URI = mongodb+srv://Ira:0sZATpGxXHT6EOgs@cluster0.l1fuv.mongodb.net/hyf?retryWrites=true&w=majority
    const res = await axios.get('/schools/comments');
    
    res.map((comment=>console.log(comment)));
  }
};



