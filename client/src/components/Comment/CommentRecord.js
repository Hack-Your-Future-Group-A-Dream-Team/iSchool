import React from "react";

import "./CommentRecord.css";

const CommentRecord = (props) => {
  return (
    <div className="comment_wrapper">
      <div className="comment_header">
        <div className="comment_created">
          {new Date(props.comment_record.created).toDateString()}{" "}
          <span class="divider"> : : </span>{" "}
          {props.comment_record.userid.role === "school" ? (
            <i className="fas fa-user-graduate"></i>
          ) : null}{" "}
          {props.comment_record.userid.firstName}{" "}
          {props.comment_record.userid.lastName}
        </div>
      </div>
      <div className="comment_body">{props.comment_record.body}</div>
    </div>
  );
};

export default CommentRecord;
