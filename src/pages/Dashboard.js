import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Card, ListGroup} from 'react-bootstrap'

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("https://603cb663f4333a0017b6833f.mockapi.io/todos")
    .then(result => setTodos(result.data))
  },[])
  console.log(todos);
  
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
// alert("msk");
    axios.post("https://603cb663f4333a0017b6833f.mockapi.io/todos", {todo: input})
    .then(result => {
      setTodos([...todos, result.data])
      console.log(result)
    })
    .catch(err => console.log(err))

    setInput("")
    console.log(input);
  }
  
  const handleDelete = (e, item) => {
    e.preventDefault()
    console.log(item);

    axios.delete(`https://603cb663f4333a0017b6833f.mockapi.io/todos/${item.id}`)
    .then(result => {
      console.log(result)
      //default filter()
      //value yaitu isi dari tiap elemen yang diproses.
      // index (optional) yaitu nomor index tiap elemen.
      // arr.filter((value, index, array) => {
      //   // kode program
      // });
      let finalData = todos.filter(value => {
        // console.log(value); //ini valuenya 1 index
        // console.log(value.id); //ini value dari properti id
        console.log(item); //ini item
        console.log(item.id); //ini value dari properti id item
        return value.id !== item.id
      });
      setTodos([...finalData])
    })
    .catch(err => console.log(err))
  }

  const handleUpdate = (e, item) => {
    // e.preventDefault()
    let dataUpdate = prompt("Please update New item : ");
    console.log(dataUpdate);
    console.log("masuk");
    
    axios.put(`https://603cb663f4333a0017b6833f.mockapi.io/todos/${item.id}`, {todo: dataUpdate})
    .then(result => {
      console.log(result)
      axios.get("https://603cb663f4333a0017b6833f.mockapi.io/todos")
      .then(result => setTodos(result.data))
    })
    .catch(err => console.log(err))
  }

  return (
    <Container className="my-5">
      <Card.Title>Dashboard Inventory</Card.Title>
      <Row className="justify-content-md-center">
      <Form className="mx-auto" onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Add New Item</Form.Label>
          <Form.Control type="text" placeholder="Enter your item" autoComplete="username" value={input} onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" >
          ADD
        </Button>
      </Form>
      </Row>
    
      <Row>
      <ListGroup className="mx-auto my-5">
        {todos.map((item,index) => (
          <ListGroup.Item key={index}>
            <span>{item.todo}</span>
            <Button variant="danger" type="submit" className="delbtn" onClick={(e) => handleDelete(e, item)}>Delete</Button>
            <Button variant="dark" type="update" onClick={(e) => handleUpdate(e, item)}>Update</Button>
            
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Row>
    </Container>
  )
}

export default Dashboard
