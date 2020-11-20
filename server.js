'use strict'

var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var dbConfig = require('./config/database.config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const mongoose = require("mongoose");

mongoose.Promise =global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully Connected to Database")
}).catch(err => {
    console.log("Unable to Connect Database right now!");
    process.exit();
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});

require('./routes')(app);
app.get('/', (req, res) => {
    res.json({"message" : "Welcome to Doctor Appoinment App API"});
})

let PORT = process.env.PORT || 9020;

app.listen(PORT, () => {
    console.log("Sever Started!! Listening on port - " + PORT)
})