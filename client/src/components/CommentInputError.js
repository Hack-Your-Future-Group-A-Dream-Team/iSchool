import React from "react";

const CommentInputError = (props) => {
  return (
    <div className="comment_error">
      {props.msg === "u" ? (
        <p>Only authorized users can leave a comments, please sign up</p>
      ) : (
        <p>School id is not defined...</p>
      )}
    </div>
  );
};

export default CommentInputError;
