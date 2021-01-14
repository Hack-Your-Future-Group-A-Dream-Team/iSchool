import axios from "axios";
import React, { Component } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import CommentInputError from "./CommentInputError";
import "./CommentRecord.css";

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_txt: "",
      usrinput_error: false,
      schoolinput_error: false,
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
      </Modal>
    );
  }

  addCommentText = (e) => {
    this.setState({ comment_txt: e.target.value });
  };

  submitComment = async (e) => {
    e.preventDefault();
    const userid = this.props.data.userid;

    if (userid === undefined || userid === "") {
      this.setState({ usrinput_error: true });
      return;
    }

    const schoolid = this.props.data.schoolid;

    await this.saveCommentToDb(userid, schoolid, this.state.comment_txt);

    this.hideAll();
  };

  saveCommentToDb = async () => {
    const res = await axios.post("/schools/comments", {
      schoolid: this.props.data.schoolid,
      userid: this.props.data.userid,
      body: this.state.comment_txt,
    });

    console.log(res.data);
  };

  hideAll = (e) => {
    this.props.onClose && this.props.onClose(e);
    this.setState({ usrinput_error: false });
  };
}

export default CommentInput;
