import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/SignUp.css"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:4000/user/register", user);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign up for an account</h1>
        <p>Have an account already? <Link to='/login'>Sign in</Link> </p>
      <Form.Group controlId="formBasicName">
        <Form.Label className="form-label">Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
}

export default Signup;