import React from 'react'
import { Form, Button, Container, Row, Card} from 'react-bootstrap'

import { useState } from "react";
import { useHistory } from 'react-router-dom'


function Login(props) {
  const history = useHistory();
  const [dataUser, setdataUser] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    console.log(e);
    setdataUser(prevState =>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    props.setIsLogin(true);

    setdataUser({
      username: "",
      password: "",
    })
    // alert("tes")
    const dataLocalStorage = localStorage.getItem("dataUser");
    const data = JSON.parse(dataLocalStorage);
    console.log(data);
    if (dataUser.username === data.username){
      console.log('user ditemukan');
      if(dataUser.password === data.password){
        console.log('user berhasil login');
        history.push("/dashboard");
      }
    }

  };
  

  return (
    <Container className="my-5">
      <Card.Title>Login Here</Card.Title>
      <Row className="justify-content-md-center">
      <Form className="mx-auto">
      <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your username" autoComplete="username" value={dataUser.username} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" autoComplete="current-password" value={dataUser.password} onChange={handleChange}/>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          login
        </Button>
      </Form>
      </Row>
    </Container>
  )
}

export default Login
