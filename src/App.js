import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import StudentList from './Student/StudentList'
import StudentDetails from './Student/StudentDetails'
import StudentCreate from './Student/StudentCreate'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

class App extends Component {
  render() {
    return (
    <Router>
      <div>
        <Navbar bg="dark" className="tutor_nav">
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        </Navbar>
      </div>

      <Container>
        <Switch>
          <Route exact path="/">
            <StudentList />
          </Route>
          <Route exact path="/students/:id" component={StudentDetails} />
          <Route exact path="/create_student" component={StudentCreate} />
        </Switch>
      </Container>
    </Router>
    );
  }
}

export default App;
