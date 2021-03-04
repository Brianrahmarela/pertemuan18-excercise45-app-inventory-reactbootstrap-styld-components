import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function Header({isLogin, setIsLogin}) {

  let history = useHistory()

  const handleLogout = (e) => {
    localStorage.clear();
    setIsLogin(false);
    history.push("/login");
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
            <Nav.Link as={NavLink} to='/dashboard' exact>Dashboard</Nav.Link>
            {isLogin ? 
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link> 
            :
            <> <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
            <Nav.Link as={NavLink} to='/login'>Login</Nav.Link></>}      
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
