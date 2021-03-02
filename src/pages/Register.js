import React from 'react'
import { Form, Button, Container, Row, Card} from 'react-bootstrap'
import { useState } from "react";
import { useHistory } from 'react-router-dom'
import axios from 'axios';

function Register() {
  const history = useHistory();
  const [dataUser, setdataUser] = useState({
    username: "",
    email: "",
    password: "",
    nama: "",
  });
  
  console.log(dataUser);

  const handleChange = (e) => {
    console.log(e);
    setdataUser(prevState =>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let patternUsername = /[0-9a-zA-Z]{6,}/;
    if (patternUsername.test(dataUser.username) === true) {
      localStorage.setItem("dataUser", JSON.stringify(dataUser));
      axios.post("https://603cb663f4333a0017b6833f.mockapi.io/User", {username: dataUser.username, email: dataUser.email, password: dataUser.password, name: dataUser.nama})
      alert("Registration Success")
      history.push("/login");
      // alert('msk')
    }
    // test regegex username min 6 character
    // console.log(patternUsername.test(dataUser.username));
  };

  //POST KE API
  // const [get, setGet] = useState([]);
  // console.log(get);

  // useEffect(() => {
  //   axios
  //   .get("https://603cb663f4333a0017b6833f.mockapi.io/User")
  //   .then((response) => setGet(response));

  // }, [])

  return (
    <Container className="my-5">
      <Card.Title>Register Here</Card.Title>
      <Row className="justify-content-md-center">
      <Form className="mx-auto">
        {/* <Form.Group controlId="formBasicUserName"> */}
        <Form.Group controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your username" autoComplete="username" value={dataUser.username} onChange={handleChange}/>
        </Form.Group>
        {/* <Form.Group controlId="formBasicEmail"> */}
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" autoComplete="username" value={dataUser.email} onChange={handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* <Form.Group controlId="formBasicPassword"> */}
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" autoComplete="current-password" value={dataUser.password} onChange={handleChange}/>
        </Form.Group>
        {/* <Form.Group controlId="formBasicName"> */}
        <Form.Group controlId="nama">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" autoComplete="name" value={dataUser.nama} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
      </Form>
      </Row>
    </Container>
  )
}

export default Register
