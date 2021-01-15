import React from "react";
import { Alert } from "react-bootstrap";
import "./CommentRecord.css";

const CommentSendSuccess = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <Alert variant="success" className="success_container">
      <p
        className="success_msg"
        style={{
          fontSize: ".8em",
          margin: "0",
          textAlign: "center",
        }}
      >
        Your comment was sent successfully
      </p>
    </Alert>
  );
};

export default CommentSendSuccess;
