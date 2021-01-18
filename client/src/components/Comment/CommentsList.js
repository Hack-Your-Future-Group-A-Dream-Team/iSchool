import React, { useState } from "react";
import CommentRecord from "./CommentRecord";
import CommentInput from "./CommentInput";
import { ToastContainer, toast } from "react-toastify";

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
          <p
            className="add_comment"
            onClick={() => {
              if (!props.data.userid) {
                toast.error("Please, sign-in to leave a comment", {
                  position: "top-right",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
                setShow(false);
                return;
              }

              setShow(true);
            }}
          >
            Add comment
          </p>
        </div>

        <CommentInput
          data={{ userid: props.data.userid, schoolid: props.data.schoolid }}
          show={show}
          onClose={() => setShow(false)}
          incrementQty={props.incrementQty}
        ></CommentInput>
      </div>
    );
  }

  return null;
};

export default CommentsList;
