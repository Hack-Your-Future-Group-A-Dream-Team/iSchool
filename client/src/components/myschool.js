import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';
import {AuthContext} from '../Context/AuthContext';

class MySchools extends Component {
    constructor(props) {
        super(props);
        this.state = {
          favoriteSchools: [],
        };
      };
      static contextType = AuthContext;

    componentDidMount() {
     //   axios.get('/schools',{userid:this.context.user._id})
        axios.get(`/user/favorites?userid=${this.context.user._id}`) 
            .then(res => {
               const favSchools = res.data;
               console.log(favSchools)
    
              this.setState({       
                favoriteSchools:favSchools.favorites 
              });
            })
      
      };

      render() {
    
        const user = this.context
        console.log(user);
        console.log(user.user._id);
        console.log(this.state.favoriteSchools);
           
        return (
          <div className="searchField">
                
            <div className="schoolList">
              {this.state.favoriteSchools.map((data)=>{
                return(
                  <Fragment>
                    <div key={data.id} className="schoolListItem">
    
                      <div>
                        <p className="schoolName">{data.name}</p>
                        <p className="schoolContact">{data.adress_str}</p>
                        <p className="schoolContact">Email: {data.email}</p>
                        <p className="schoolContact">Phone: {data.phone}</p>
                        <div className="btn-container">
                          <button className="schoolList-btn">Remove from list</button>
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

export default MySchools