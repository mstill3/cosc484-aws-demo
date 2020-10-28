import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const API_URL = 'http://ec2-18-220-26-15.us-east-2.compute.amazonaws.com';
const API_PORT = '3000';


const App = () => {

  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('---');

  const onTextChange = (event) =>
    setName(event.target.value);

  const onButtonPress = () =>
    axios.get(`${API_URL}:${API_PORT}/greeting`, {params: {name}})
      .then(resp => setGreeting(resp.data.greeting));

  return (
    <div className="App">
      <header className="App-header">
        <h1> COSC 484 </h1>
        <img 
          src={logo} 
          className="App-logo" 
          alt="logo" 
        />
        <p> Enter your name: </p>
        <TextField 
          id="nameBox" 
          variant="outlined"
          value={name}
          onChange={onTextChange}
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={onButtonPress}
        > 
          Submit 
        </Button>
        <p> {greeting} </p>
      </header>
    </div>
  );
}

export default App;
