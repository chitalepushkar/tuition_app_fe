import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
  Link
} from "react-router-dom";

class StudentList extends Component {
  state = {
    isLoading: true,
    students: null,
    query_string: ''

  };

  componentDidMount() {
    this.fetchFilteredList();
  };

  async fetchFilteredList() {
    const query = this.state.query_string;
    const url = "http://localhost:3001/students.json?query=" + query;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ students: data, loading: false });
  }

  filterList = (event) => {
    const query_string = event.target.value

    this.setState({query_string}, () => {
      this.fetchFilteredList();
    });
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.students) {
      return <div>didn't get a person</div>;
    }

    const student_list = this.state.students.map((student) =>
      <Link to={`/students/${student.id}`}> 
        <ListGroup.Item key={student.id}>{student.first_name}</ListGroup.Item>
      </Link>
    );

    return (
    <div>
      <Link to={`/create_student`}> 
        <Button variant="primary" size="lg" active>
          Create student
        </Button>
      </Link>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" placeholder="Search students" onChange={this.filterList}/>
        </Form.Group>
      </Form>

      <ListGroup>
        {student_list}
      </ListGroup>
    </div>
    );
  }
}

export default StudentList;
