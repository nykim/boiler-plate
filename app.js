const express = require('express');
const app = express();
const port = 3000; 
const mongoose = require('mongoose');
const config = require('./config/keys');
const { User } = require('./models/User');

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//application/json
app.use(express.json());

app.get('/', function(req, res) {
    res.send('Hello world all by myself');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

