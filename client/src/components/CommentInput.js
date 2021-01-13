import axios from "axios";
import React, { Component } from "react";
import { Modal, Form, Alert, Button, Container } from "react-bootstrap";

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_txt: "",
      usrinput_error: false,
      schoolinput_error: false,
      modalShow: false,
    };
  }

  componentDidMount() {
    this.setState({ modalShow: !this.state.modalShow });
  }

  render() {
    return (
      <Modal
        show={this.state.modalShow}
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
                <Button className="close-btn" size="md" onClick={this.hideAll}>
                  Close
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        {this.state.usrinput_error ? (
          <Alert variant="danger" className="error_container">
            <p
              style={{
                fontSize: ".8em",
                margin: "0",
                textAlign: "center",
              }}
            >
              Only authorized users can leave comments
            </p>
          </Alert>
        ) : null}
        ;
        {this.state.schoolinput_error ? (
          <Alert
            variant="danger"
            onClose={() => {
              this.setState({ show: false });
            }}
            dismissible
          >
            <p>Error happens: School id not defined...</p>
          </Alert>
        ) : null}
      </Modal>
    );
  }

  addCommentText = (e) => {
    this.setState({ comment_txt: e.target.value });
  };

  submitComment = (e) => {
    e.preventDefault();
    const userid = this.props.data.userid;

    if (userid === undefined || userid === null) {
      this.setState({ usrinput_error: true });
      return;
    }

    const schoolid = this.props.data.schoolid;
    if (schoolid === undefined || userid === null) {
      this.setState({ schoolinput_error: true });
      return;
    }

    console.log(
      `userid: ${this.props.data.userid}  schoolid: ${this.props.data.schoolid}`
    );

    axios
      .post("/schools/comments", {
        schoolid: this.props.data.schoolid,
        userid: this.props.data.userid,
        body: this.state.comment_txt,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  hideAll = () => {
    this.setState({ modalShow: false });
    this.setState({ userinput_error: false });
  };
}

export default CommentInput;
