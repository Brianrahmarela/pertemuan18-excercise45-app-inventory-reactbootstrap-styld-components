import React from 'react'
import { Form, Button, Container, Row, Card} from 'react-bootstrap'
import axios from 'axios';

import { useState } from "react";
import { useHistory } from 'react-router-dom'


function Login(props) {
  const history = useHistory();
  const [dataUser, setdataUser] = useState({
    username: "",
    password: "",
  })
  console.log(dataUser);

  // useEffect(() => {
  //   axios.get("https://603cb663f4333a0017b6833f.mockapi.io/User")
  //   // .then(response => console.log(response.data))
  //   .then(response => setdataUser(response.data));
  // },[])
  // console.log(todos);

  const handleChange = (e) => {
    console.log(e);
    setdataUser(prevState =>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  };


  const handleSubmit = (e) => {
    e.preventDefault();

      axios.get("https://603cb663f4333a0017b6833f.mockapi.io/User")
      // .then(response => console.log(response.data))
      .then(response => {
        console.log(response);
        const dataHasil = response.data
        const dataUserAPI = dataHasil.find((item)=>{
          //debug
          // console.log(item);
          // console.log(item.username);
          // console.log(item.password);
          // console.log(dataUser);
          // console.log(dataUser.username);
          // console.log(dataUser.password);
          // console.log(item.username === dataUser.username);
          // console.log(item.password === dataUser.password);
          // console.log(item.username === dataUser.username && item.password === dataUser.password);

          return item.username === dataUser.username && item.password === dataUser.password
        });
        console.log(dataUserAPI);
        
        //Cek apakah dataUserAPI ada isinya(jika ada artinya sdh melewati validasi pengecekan username & password(line 53))
        if(dataUserAPI){
          alert('user berhasil login! DATA USER ADA DI API!');
          props.setIsLogin(true);
          setdataUser({
            username: "",
            password: "",
          })
          history.push("/dashboard");
        }else{
          alert("Maaf, user anda tidak ditemukan! email dan password salah!");
        }
        //Cek username pass dari API && localStorage
        // const dataLocalStorage = localStorage.getItem("dataUser");
        // const data = JSON.parse(dataLocalStorage);
        // if(dataUserAPI.username === data.username){
        //   console.log('user ditemukan');
        //   if(dataUserAPI.password === data.password){
        //         console.log('user berhasil login');
        //         history.push("/dashboard");
        //       }
        // }
        // else{
        //     alert("User tidak ditemukan! email dan password salah!");
        // }

        //Cek key Local Storage username & pass
        // const dataLocalStorage = localStorage.getItem("dataUser");
        // const data = JSON.parse(dataLocalStorage);
        // console.log(data);
        // if (dataUser.username === data.username){
        //   console.log('user ditemukan');
        //   if(dataUser.password === data.password){
        //     console.log('user berhasil login');
        //     history.push("/dashboard");
        //   }
        // }
      });
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

        <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
          login
        </Button>
      </Form>
      </Row>
    </Container>
  )
}

export default Login
