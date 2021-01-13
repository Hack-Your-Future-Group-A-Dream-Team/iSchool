import React from "react";

import "./CommentRecord.css";

const CommentRecord = (props) => {
  return (
    <div className="comment_wrapper">
      <div className="comment_header">
        <div className="comment_created">
          {new Date(props.comment_record.created).toDateString()}{" "}
          <span>: :</span> {props.comment_record.userid.firstname}{" "}
          {props.comment_record.userid.lastname}
        </div>
      </div>
      <div className="comment_body">{props.comment_record.body}</div>
    </div>
  );
};

export default CommentRecord;
