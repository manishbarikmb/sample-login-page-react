import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: false,
    data: null,
    username: "",
    password: "",
    remarks: "",
  };

  handleChange({ target }) {
    console.log(target.name);
    console.log(target.value);
    this.setState({
      [target.name]: target.value,
    });
  }
  componentDidMount() {
    this.checkUser = this.checkUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  checkUser = () => {
    let username = this.state.username;
    let password = this.state.password;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    fetch("https://reqres.in/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === "user not found") {
          console.log("User not found");
        } else {
          this.setState({
            data: data,
            loggedIn: true,
            remarks: "Great! You are now logged in",
          });
        }
      });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="form">
            <h2>Login Form</h2>
            <form action="POST">
              <label htmlFor="name">Enter your email</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange.bind(this)}
              ></input>
              <br />
              <label htmlFor="name">Enter your password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              ></input>
              <br />
              <button onClick={this.checkUser}>Login</button>
            </form>
            <p>{this.state.remarks}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
