import React from "react";
import CommentRecord from "./CommentRecord";
import CommentInput from "./CommentInput";

let showModal = false;

const CommentsList = (props) => {
  if (props.commentsList.length) {
    return (
      <div className="comments_list_container">
        {props.commentsList.map((item) => {
          return (
            <CommentRecord key={item._id} comment_record={item}></CommentRecord>
          );
        })}
        <div className="collapse_all">
          <i
            className="fas fa-chevron-circle-up"
            onClick={props.collapseAll}
          ></i>{" "}
          <p
            className="add_comment"
            onClick={(e) => {
              openModal();
            }}
          >
            Add comment
          </p>
        </div>

        <CommentInput
          data={{ userid: props.userid, schoolid: props.schoolid }}
          show={showModal}
          // onClose={this.openInputCommentModal}
        ></CommentInput>
      </div>
    );
  }

  return null;
};

const openModal = (e) => {
  console.log(showModal);
  showModal = true;
  console.log(showModal);
};

export default CommentsList;
