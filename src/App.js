import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom'
import { useState } from "react";


// components
import Header from "./components/Header";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLogin);

  return (
    <div className="App">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}/>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/dashboard">
        {isLogin ? <Dashboard /> : <Redirect to="/login"/>}
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login setIsLogin={setIsLogin}/>
      </Route>
 
    </Switch>
    </div>

  );
}

export default App;
