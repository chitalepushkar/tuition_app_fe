import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class StudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const id = this.props.match.params.id;
    const url = id === undefined ? "http://localhost:3001/students.json" : "http://localhost:3001/students/" + id;
    const method = id === undefined ? "post" : "put"
    const that = this;

    fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({student: {...this.state}})
    }).then(function(response) {
      that.props.history.push("/");
    });
  }

  changeInputValues = (event, input_name) => {
    this.setState({[input_name]: event.target.value})
  }

  componentDidMount() {
    this.fetchStudentDetails();
  };

  async fetchStudentDetails() {
    const id = this.props.match.params.id;
    const url = "http://localhost:3001/students/" + id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({...data});
  }

  render() {
    return (
    <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formStudentFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" onChange={(e) => this.changeInputValues(e, 'first_name')} value={this.state.first_name} />
        </Form.Group>

        <Form.Group controlId="formStudentLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" onChange={(e) => this.changeInputValues(e, 'last_name')} value={this.state.last_name}/>
        </Form.Group>

        <Form.Group controlId="formStudentContactNumber">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control type="text" placeholder="Enter contact number" onChange={(e) => this.changeInputValues(e, 'phone_number')} value={this.state.phone_number}/>
        </Form.Group>

        <Form.Group controlId="formStudentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" onChange={(e) => this.changeInputValues(e, 'email')} value={this.state.email}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    );
  }
}

export default StudentForm;
