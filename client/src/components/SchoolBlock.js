import React, { Component } from "react";
import axios from "axios";
import CommentsList from "./Comment/CommentsList";
import CommentInput from "./Comment/CommentInput";
import { Link} from 'react-router-dom';
import StarRating from 'react-star-ratings';
import { AuthContext } from "../Context/AuthContext";
import { withRouter } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export class SchoolBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      commentsList: [],
      showModal: false,
      commentsIncrement: 0,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { qty: props.details.comments };
  }

  static contextType = AuthContext;

  render() {
    const details = this.props.details;

    const userid = this.props.userid;

    return (
      <div className="schollListItem_container">
        <div className="schoolListItem">
          <div className="school_wrapper">
            <div className="school-details">
              <Link to={`/school/info/${details._id}`}>
                <p
                  className="schoolName"
                  style={{ textDecoration: "underline" }}
                >
                  {details.name}
                </p>
              </Link>
              <p className="schoolContact">{details.adress_str}</p>
              <p className="schoolContact">Email: {details.email}</p>
              <p className="schoolContact">Phone: {details.phone}</p>
              <div className="btn-container">

                {this.props.page && (
                  <button
                    className="schoolList-btn"
                    onClick={() => this.props.saveFavorite(this.props.details)}
                  >
                    Add to My Schools
                  </button>
                )}
                {!this.props.page && (
                  <button
                    className="schoolList-btn"
                    onClick={() =>
                      this.props.deleteFavorite(this.props.details._id)
                    }
                  >
                    Remove from list
                  </button>
                )}
                <button
                  className="schoolList-btn"
                  onClick={(e) => this.openInputCommentModal()}
                >
                  Add comment
                </button>
              </div>
            </div>

            <div className="schoolListItem-rightSide">
              <div className="review-container">

                {/* <form onSubmit={this.props.sendRating}>

                  <fieldset className="ratingForm">
                    <div className="addRatingStarContainer">
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="5"
                        id={details._id + "1"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={details._id + "1"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="4"
                        id={details._id + "2"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={details._id + "2"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="3"
                        id={details._id + "3"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={details._id + "3"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="2"
                        id={details._id + "4"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={details._id + "4"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="1"
                        id={details._id + "5"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={details._id + "5"}
                      ></label>
                    </div>
                    <div className="submit_rate_container">
                      <input
                        type="hidden"
                        name="schoolid"
                        value={details._id}
                      ></input>
                      <input type="hidden" name="userid" value={userid}></input>
                      <input
                        className="sendRating"
                        type="submit"
                        value="Add score"
                      ></input>
                    </div>
                  </fieldset>
                </form> */}

            <StarRating  name="small-rating" caption="Small!" size={10} totalStars={5} starDimension="20px"  rating={details.rating} starRatedColor="#B71C1C" changeRating={this.setNewRating}/>

                <div className="review-average">
                  <p>
                    {" "}

                    <span>
                      ( Current rating is {" "}
                      {this.props.new_rating === 0
                        ? this.props.details.rating
                        : this.props.new_rating}
                      )
                    </span>

                  </p>
                </div>
              </div>
              <div className="school-comments-qty">
                <p data-key={details._id} onClick={this.getCommentsList}>
                  <i
                    className={
                      this.state.showComments
                        ? "fas fa-chevron-up"
                        : "fas fa-chevron-down"
                    }
                  ></i>{" "}
                  Comments{" "}
                  <span>
                    (
                    {this.props.details.comments + this.state.commentsIncrement}
                    )
                  </span>
                </p>
              </div>
            </div>
          </div>

          <CommentInput
            data={{ userid: userid, schoolid: details._id }}
            show={this.state.showModal}
            onClose={this.openInputCommentModal}
            incrementQty={this.incrementQty}
          ></CommentInput>

          {this.state.showComments ? (
            <CommentsList
              commentsList={this.state.commentsList}
              data={{ userid: userid, schoolid: details._id }}
              collapseAll={this.collapseAll}
              incrementQty={this.incrementQty}
            />
          ) : null}
        </div>
      </div>
    );
  }

  updateScore = async (e) => {
    await this.props.sendRating(e);
  };

 setNewRating = (rating) =>  {
  if(this.context.isAuthenticated) {
  axios
    .post("/schools/rating", {
      score: rating,
      schoolid: this.props.details._id,
      userid: this.props.userid,
    })
    .then((res) => {
      toast.success("Thank you for sharing your opinion!");
      console.log("new rating: " + JSON.stringify(res.data));
    })
    .catch((err) => {
      toast.error("Something went wrong. Try again.");
      console.log(err.response);
    });
  }else{
    toast.error('Only authorized users can leave review. Please SIGN IN')
    setTimeout(()=>{
      this.props.history.push('/login');
    },5000)
  }
 }

  getCommentsList = async (e) => {
    e.preventDefault();

    this.setState({ showComments: !this.state.showComments });

    if (!this.state.commentsList.length) {
      const obj = await axios.get(
        `/schools/comments?schoolid=${e.currentTarget.dataset.key}`
      );
      const res = await obj.data.comments;

      this.setState({ commentsList: res });
    }
  };

  incrementQty = () => {
    this.setState({ commentsIncrement: this.state.commentsIncrement + 1 });
  };

  collapseAll = () => {
    this.setState({ showComments: false });

    this.setState({ commentsList: [] });
  };

  openInputCommentModal = (e) => {
    if (this.props.userid === "" || this.props.userid === undefined) {
      toast.error("Please, sign-in to leave a comment", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }

    this.setState({ showModal: !this.state.showModal });
  };
}

export default withRouter(SchoolBlock);
