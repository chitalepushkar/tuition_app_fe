import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
  Link
} from "react-router-dom";

class StudentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { student: {} };
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form_inputs = event.target.getElementsByTagName("input");
    const first_name = form_inputs.formStudentFirstName.value;
    const last_name = form_inputs.formStudentLastName.value;
    const contact_number = form_inputs.formStudentContactNumber.value;
    const email = form_inputs.formStudentEmail.value;
    const url = "http://localhost:3001/students.json";
    const that = this;

    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({student: {first_name, last_name, phone_number: contact_number, email}})
    }).then(function(response) {
      that.props.history.push("/");
    });
  }

  render() {
    return (
    <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formStudentFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" />
        </Form.Group>

        <Form.Group controlId="formStudentLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" />
        </Form.Group>

        <Form.Group controlId="formStudentContactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control type="text" placeholder="Enter contact number" />
        </Form.Group>

        <Form.Group controlId="formStudentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    );
  }
}

export default StudentCreate;
