import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { student: {} };
  }

  componentDidMount() {
    this.fetchStudentDetails();
  };

  async fetchStudentDetails() {
    const id = this.props.match.params.id;
    const url = "http://localhost:3001/students/" + id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ student: data});
  }

  removeStudent = () => {
    const that = this
    const student_id = this.state.student.id;
    const url = "http://localhost:3001/students/" + student_id;

    fetch(url, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      that.props.history.push("/");
    });
  }


  render() {
    return (
    <div>
      <h3>{this.state.student.first_name} {this.state.student.last_name}</h3>
      <Button variant="danger" size="lg" active onClick={this.removeStudent}>
        Remove
      </Button>
      <Link to={`/students/${this.state.student.id}/edit`}>
        <Button variant="primary" size="lg" active>
          Edit
        </Button>
      </Link>
    </div>
    );
  }
}

export default StudentDetails;
