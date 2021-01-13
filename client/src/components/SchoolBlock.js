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
                <div className="review-stars">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
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
