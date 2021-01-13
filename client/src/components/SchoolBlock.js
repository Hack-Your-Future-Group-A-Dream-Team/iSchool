import React, { Component } from "react";
import axios from "axios";
import CommentsList from "./CommentsList";
import CommentInput from "./CommentInput";

export class SchoolBlock extends Component {
  constructor() {
    super();
    this.state = {
      showComments: false,
      commentsList: [],
      modalShow: false,
    };
  }

  render() {
    const details = this.props.details;
    const userid = this.props.userid;

    return (
      <div className="schollListItem_container">
        <div className="schoolListItem">
          <div className="school_wrapper">
            <div className="school-details">
              <p className="schoolName">{details.name}</p>
              <p className="schoolContact">{details.adress_str}</p>
              <p className="schoolContact">Email: {details.email}</p>
              <p className="schoolContact">Phone: {details.phone}</p>
              <div className="btn-container">
                <button className="schoolList-btn">Save school</button>
                <button className="schoolList-btn" onClick={this.addComment}>
                  Add comment
                </button>
              </div>
            </div>

            <div className="schoolListItem-rightSide">
              <div className="review-container">
                <div className="review-header">Rate: </div>

                <form onSubmit={this.sendRating}>
                  <fieldset className="ratingForm">
                    <div className="addRatingStarContainer">
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="5"
                        id={data._id + "1"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={data._id + "1"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="4"
                        id={data._id + "2"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={data._id + "2"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="3"
                        id={data._id + "3"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={data._id + "3"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="2"
                        id={data._id + "4"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={data._id + "4"}
                      ></label>
                      <input
                        className="addRatingStar"
                        type="radio"
                        name="score"
                        value="1"
                        id={data._id + "5"}
                      ></input>
                      <label
                        className="addRatingLabel far fa-star"
                        for={data._id + "5"}
                      ></label>
                    </div>
                    <div>
                      <input
                        type="hidden"
                        name="schoolid"
                        value={data._id}
                      ></input>
                      <input
                        type="hidden"
                        name="userid"
                        value={user.user._id}
                      ></input>
                      <input
                        className="sendRating"
                        type="submit"
                        value="Send"
                      ></input>
                    </div>
                  </fieldset>
                </form>

                <div className="review-average">({details.rating})</div>
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
                  Comments <span>({details.comments})</span>
                </p>
              </div>
            </div>
          </div>
          <CommentInput
            data={{ userid: userid, schoolid: details._id }}
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
          ></CommentInput>
          {this.state.showComments ? (
            <CommentsList
              commentsList={this.state.commentsList}
              collapseAll={this.collapseAll}
            />
          ) : null}
        </div>
      </div>
    );
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

  collapseAll = () => {
    this.setState({ showComments: false });

    this.setState({ commentsList: [] });
  };

  addComment = (e) => {
    console.log(e);
    this.setState({ modalShow: !this.state.modalShow });
  };
}

export default SchoolBlock;

///////////////////////////////////////

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
    </div>
  </div>

  <div className="schoolListItem-rightSide">
    <div className="schoolList-comments">Read Comments</div>
    <div className="schoolList-rating">Rating: {data.rating}</div>
  </div>
</div>;

///////////////////////////////////////

{
  /* <div key={data.id} className="schoolListItem">

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
                            <input type="hidden" name="userid" value={user.user._id}></input>
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
                  
                </div> */
}
