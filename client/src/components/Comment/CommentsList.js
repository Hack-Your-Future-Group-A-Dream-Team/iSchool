import React from "react";
import CommentRecord from "./CommentRecord";

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
          <p className="add_comment">Add comment</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CommentsList;
