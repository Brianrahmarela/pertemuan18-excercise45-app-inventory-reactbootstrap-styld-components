import './App.css';

import {Switch, Route} from 'react-router-dom'


// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Header />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
 
      {/* <Route path="/gallery">
        <Gallery />
      </Route>
      <Route path="/todo">
        <Todo />
      </Route> */}
    </Switch>
    </div>

  );
}

export default App;
