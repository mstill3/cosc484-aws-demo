#!/usr/bin/env node

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
