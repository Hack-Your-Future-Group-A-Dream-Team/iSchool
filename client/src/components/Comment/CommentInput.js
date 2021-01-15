import React, { Component } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import CommentSendSuccess from "./CommentSendSuccess";
import CommentInputError from "./CommentInputError";
import "./CommentRecord.css";
import pushCommentToDB from "./utils/pushCommentToDB";

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_txt: "",
      usrinput_error: false,
      schoolinput_error: false,
      success: false,
    };
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <Modal
        className="modal_container"
        show={this.props.show}
        onHide={this.hideAll}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="form_header"
          >
            Your comment:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.submitComment}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={6}
                onChange={this.addCommentText}
              />
            </Form.Group>

            <Form.Group>
              <div className="button_holder">
                <Button className="send-btn" size="md" type="submit">
                  Submit
                </Button>
                <Button
                  className="close-btn"
                  size="md"
                  onClick={(e) => {
                    this.hideAll();
                  }}
                >
                  Close
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <CommentInputError show={this.state.usrinput_error}></CommentInputError>
        <CommentSendSuccess show={this.state.success}></CommentSendSuccess>
      </Modal>
    );
  }

  addCommentText = (e) => {
    this.setState({ comment_txt: e.target.value });
  };

  submitComment = (e) => {
    e.preventDefault();
    const userid = this.props.data.userid;
    if (userid === undefined || userid === "") {
      this.setState({ usrinput_error: true });
      return;
    }

    const schoolid = this.props.data.schoolid;

    const savingResult = pushCommentToDB(
      userid,
      schoolid,
      this.state.comment_txt
    );

    console.log(savingResult);

    if (savingResult !== null) {
      this.setState({ success: true });
    }

    window.setTimeout(() => {
      this.hideAll();
    }, 2000);

    // this.hideAll();
  };

  hideAll = (e) => {
    this.props.onClose && this.props.onClose(e);
    this.setState({ usrinput_error: false });
    this.setState({ success: false });
  };
}

export default CommentInput;
