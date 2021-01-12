import React, { Component } from "react";
import { Modal, Form, Row, Col, Button, Container } from "react-bootstrap";

class CommentInput extends Component {
  render() {
    return (
      <Modal
        {...this.props}
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
              <Form.Control as="textarea" rows={6} />
            </Form.Group>

            <Form.Group>
              <div className="button_holder">
                <Button className="send-btn" size="md" type="submit">
                  Submit
                </Button>
                <Button
                  className="close-btn"
                  size="md"
                  onClick={this.props.onHide}
                >
                  Close
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  submitComment = (e) => {
    e.preventDefault();
    console.log(e);
  };
}

export default CommentInput;
