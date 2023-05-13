import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css"

function Login() {
    const [id,setId]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    let response=axios
      .post("https://magnificent-blue-caiman.cyclic.app/user/login", user)
      .then((response) => {
        console.log(response.data.data._id)
       window.localStorage.setItem("userId", response.data.data._id);
        console.log(response);
        navigate("/");
        
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");

  };
 

  return (
    <div className="login-container">
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
        <h1 className="fw-bold">Website Learners</h1>
          <h2>Log in</h2>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="submit-button">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
