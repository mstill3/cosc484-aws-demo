# Using AWS tutorial
Written by Matt Stillwell   
For Towson University COSC484 

## Basic HTML Website

### Prerequisites
1. Have a text editor and an internet browser (preferable Chrome) installed on the machine

### Creating a basic webpage
1. Go to a local directory you would like the files to be saved, then create 2 new files named `index.html` and `style.css`
1. Open up the `index.html` file with a text editor and then add this:
```html
<html>
    <head>
        <title> This is a webpage </title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap">
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <h1> Hello world! </h1>
        <p> This is paragraph text </p>
    </body>
</html>
```
1. Open up the `styles.css` file with a text editor and then add this:
```css
body {
    background-color: wheat;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
}

h1 {
    padding-top: 50px;
}

p {
    color: darkslategrey;
}
```
1. Save both of these files and then try opening the `index.html` file in your web browser



## Express API

### Prerequisites
1. Ensure (node)[https://nodejs.org/en/] is installed on your machine
1. Ensure (yarn)[https://classic.yarnpkg.com/en/docs/install/#mac-stable] is installed on your machine

### Creating a basic API
1. Go to a local directory you would like the files to be saved, create a new folder called `basic-api`, go into that directory (`cd basic-api`)
1. Create a new file named `package.json` and set this to be its contents:
```json
{
  "name": "basic-api",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "http-status-codes": "^2.1.4"
  },
  "scripts": {
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "matt",
  "license": "ISC"
}
```
1. Run `yarn install` to download dependencies
1. Create a new file named `server.js` and set this to be its contents: 
```javascript
const HttpStatus = require("http-status-codes");
const bodyparser = require("body-parser");
const cors = require("cors");

const express = require('express');
const app = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.get("/greeting", (req, resp) => {
    const name = req.query.name ? req.query.name : ' world' ;
    const greeting = `Hello ${name}`;
    resp.status(HttpStatus.OK).send({greeting});
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
```
1. Test that it runs with `yarn start`


## React Website using API

### Prerequisites
1. Ensure (node)[https://nodejs.org/en/] is installed on your machine
1. Ensure (create-react-app)[https://reactjs.org/docs/create-a-new-react-app.html#create-react-app] cli is installed on your machine

### Creating a react webpage
1. Go to a local directory you would like the files to be saved, then run the command `npx create-react-app react-app`
1. Go into the `react-app` directory (`cd react-app/`)
1. Run `yarn add @material-ui/core` to add nice looking components into project
1. Run `yarn add axios` to add network request calls and responses
1. Add this code onto the end of the `App.css` file:
```css
#nameBox {
  /* color: white; */
  background-color: rgb(214, 214, 214);
}
```
1. Replace contents of `App.js` with this instead:
```javascript
import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const API_URL = '<YOUR_API_URL_HERE>';
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
```
1. Run `yarn build` to build the static html files in the `build` directory
1. Run `yarn start` to host the react repo locally, you can see the webpage if you visit `localhost:3000` in a browser




## AWS

### Prerequisites
1. Log into/ Create AWS account [here](https://aws.amazon.com)
1. Have ssh cli command installed
1. Have rsync cli command installed

### Part 1: Basic website deployment with S3
1. Ensure you have completed the `Basic HTML Website` section before starting
1. Click on `Services` at the top, and select `S3` under `Storage`
1. Select `Create Bucket` button
1. Name it `basic-website`, select `US East (Virginia)`, uncheck `Block all public access`, check `I acknowledge that the current settings might result in this bucket and the objects within becoming public.` and then leave all the other settings the same.
1. Select `Create bucket` button 
1. Select `basic-website`, Ensure `Objects` tab is selected, click `Upload` button
1. Drag in the `index.html` and the `styles.css` files from the `Basic HTML Website` section, and click the `Upload` button
1. Click the `basic-website` link near the of of the page
1. Click on the `Objects` tab, and select `index.html` and `style.css` and then click the `Actions` button and select `Make public`
1. Click on the `Properties` tab, scroll to the bottom, click the `Edit` button for the `Static website hosting` section and select `Enable`
1. Type in `index.html` in the index document textbox and then select `Save changes` button
1. Now if you scroll down to the bottom of the page again, you should see a url hosting the public static website 

### Part 2: Basic API deployment with EC2
1. Click on `Services` at the top, and select `EC2` under `Compute`
1. Click the orange `Launch instance` button
1. Select the free, first linux volume type and click continue button
1. Ensure the instance type is set to `Free tier eligable` and Click the enter button again
1. Click `Review and Launch` button, then click `Launch` button
1. Select an existing keypair or create a new keypair
1. Name it something like `MyKeyPair`, and click the `Download Key Pair` button, then select `Launch Instances` button
1. Select the `View Instances` button, click on the new instance
1. Copy the value under the `Public IPv4 DNS` section and then change the `API_URL` value in the `App.js` file from the `React Website using API` section to be `http://{YOUR_API_IP_ADDRESS_HERE}`
1. Copy the `MyKeyPair.pem` file to the directory right above the `basic-api` directory from the `Express API` section
1. Change the permissions of the `MyKeyPair.pem` file using `chmod 400 MyKeyPair.pem`
1. On the web browser select `Security Groups` under the `Network & Security`, and select the orange `Create Security Group` button
1. Name it something like `Connected`, description as `connected` and set the inbound rules to include `All Traffic` on `0.0.0.0/0` and select `Create security group`
1. Go back to the EC2 dashboard and select the running instance, change the security group to `Connected`
1. Back in the terminal, copy over the files from the `Express API` sections onto the EC2 Cloud computer with `rsync -rave "ssh -i MyKeyPair.pem" "./basic-api" ec2-user@{YOUR_API_ADDRESS_HERE}:/home/ec2-user
1. Connect into the ec2 instance with this command: `ssh -i "MyKeyPair.pem" ec2-user@{YOUR_API_ADDRESS_HERE}`
1. Once logged in navigate to the `basic-api` folder (`cd basic-api`)
1. Install node and yarn on the ec2 instance with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`
1. Run `. ~/.nvm/nvm.sh` then `nvm install node`
1. Then run `npm install` and then run `npm start`
1. NOTE: Do not close this window or else the API will stop running

### Part 3: Integrated website deployment with S3 interfacing with API on EC2
1. Run `yarn build` in the react directory from `React Website using API` section
1. Click on `Services` at the top, and select `S3` under `Storage`
1. Select `Create Bucket` button
1. Name it `react-website`, select `US East (Virginia)`, uncheck `Block all public access`, check `I acknowledge that the current settings might result in this bucket and the objects within becoming public.` and then leave all the other settings the same.
1. Select `Create bucket` button 
1. Select `react-website`, Ensure `Objects` tab is selected, click `Upload` button
1. Drag in the *contents* of `build` directory from the `React Website using API` section, and click the `Upload` button
1. Click the `react-website` link near the of of the page
1. Click on the `Objects` tab, and select all the files and then click the `Actions` button and select `Make public`
1. Click on the Security tab, and select `Connected` as the security group
1. Click on the `Properties` tab, scroll to the bottom, click the `Edit` button for the `Static website hosting` section and select `Enable`
1. Type in `index.html` in the index document textbox and then select `Save changes` button
1. Now if you scroll down to the bottom of the page again, you should see a url hosting the public static react website 
