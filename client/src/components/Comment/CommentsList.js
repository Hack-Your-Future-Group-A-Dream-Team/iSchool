import React, { useState } from "react";
import CommentRecord from "./CommentRecord";
import CommentInput from "./CommentInput";

const CommentsList = (props) => {
  const [show, setShow] = useState(false);

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
          <p className="add_comment" onClick={() => setShow(true)}>
            Add comment
          </p>
        </div>

        <CommentInput
          data={{ userid: props.data.userid, schoolid: props.data.schoolid }}
          show={show}
          onClose={() => setShow(false)}
        ></CommentInput>
      </div>
    );
  }

  return null;
};

export default CommentsList;
