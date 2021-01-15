import React from "react";
import { Alert } from "react-bootstrap";
import "./CommentRecord.css";

const CommentInputError = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <Alert variant="danger" className="error_container">
      <p
        className="error_msg"
        style={{
          fontSize: ".8em",
          margin: "0",
          textAlign: "center",
        }}
      >
        Only authorized users can leave comments
      </p>
      <p
        style={{
          fontSize: ".8em",
          margin: "0",
          textAlign: "center",
        }}
      >
        Please, <a href="/login">sign in</a>
      </p>
    </Alert>
  );
};

export default CommentInputError;
