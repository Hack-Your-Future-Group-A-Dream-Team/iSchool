import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';
import {AuthContext} from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SchoolBlock from "./SchoolBlock";
import { withRouter } from 'react-router-dom';

class MySchools extends Component {
    constructor(props) {
        super(props);
        this.state = {
          favoriteSchools: [],
          isSearchPage:false
        };
        this.sendRating = this.sendRating.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
      };
      static contextType = AuthContext;

    componentDidMount() {
  
        this.fetchFavorites()
      
      };

    fetchFavorites(){        
      axios.get(`/user/favorites?userid=${this.context.user._id}`) 
      .then(res => {
         const favSchools = res.data;
         console.log(favSchools)

        this.setState({       
          favoriteSchools:favSchools.favorites 
        });
      })}

    deleteFavorite(data){
      axios({method:'post', 
                url:'/user/favorites', 
                data:{
                        userid:this.context.user._id,
                        schoolId:data
                  }
              }
        )
        .then(data=>{
                console.log(data); 
                this.fetchFavorites()
                toast.success("Successfully removed from list!")
              })
        .catch(err=>console.log(err))
        console.log(this.state)
      }

      sendRating(e) {
        e.preventDefault();
        if(this.context.isAuthenticated) {
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
            console.log("new rating: " + JSON.stringify(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
        }else{
          toast.error('Only authorized users can leave review. Please SIGN IN')
          setTimeout(()=>{
            this.props.history.push('/login');
          },5000)
        }
      }

    render() {
           
        return (
          <div className="searchField">
            <ToastContainer />    
            <div className="schoolList">
            {this.state.favoriteSchools.map((data) => {
            return (
              <Fragment key={data._id}>
                <SchoolBlock
                  details={data}
                  userid={this.context.user._id}
                  sendRating={this.sendRating}
                  deleteFavorite={this.deleteFavorite}
                  page={this.state.isSearchPage}
                ></SchoolBlock>
              </Fragment>
            );
          })}
              
              </div>
          </div>
        )
      };
};

export default MySchools