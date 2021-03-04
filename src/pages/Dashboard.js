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

      let finalData = todos.filter(itemTodos => {
        //cth value itemTodos: 0: {id: "2", todo: "aaaa"}
        console.log(itemTodos); //ini representasi item-item yg ada di var todos state, yaitu (0: {id: "2", todo: "aaaa"})
        console.log(itemTodos.id); //ini mrujuk properti id dari var todos state, namun yg diambil valuenya yaitu (2)
        console.log(item); //ini item dari param handleDelete, yaitu elemen button yg diklik, yaitu (id: "6", todo: "ggg")
        console.log(item.id); //ini mrujuk properti id dari param handleDelete, namun yg diambil valuenya yaitu (6)

        //akan mengembalikan jika kondisi value properti id dari var todos state (dicek semua idnya dari id: "1" sampai dgn id: "6" tdk sama dgn properti id dari param handleDelete yg di klik, valuenya 6
        return itemTodos.id !== item.id
        //krn return filter array & bisa bnyk data/ lebih dari 1 maka item2 todos.id yg tdk sama dgn item.id direturn semua kecuali id state variable todos yg sama dgn item.id. jd yg direturn 5 data, id dgn value 1-5. kecuali id dgn value 6
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
