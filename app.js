require('dotenv').config()
var express = require("express");
var app = express();
var api = require("./src/api.js");
var dbController = require("./src/dbController.js");
var mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect(process.env.DB);

app.get("/:queryToSearch", (req, res) => {
    var offset = req.query.offset;
    var searchQuery = req.params.queryToSearch;
    
    api(res, searchQuery, offset);
});

app.get("/api/latest", (req, res) => {
    dbController.request(res);
});

app.get("/", (req, res) => {
    res.send("To use the app, just type your query after this address. For example: /cats<br><br>You can check the latest queries by using /api/latest.")
});

app.use(function (req, res, next) {
    res.status(404).send("Page not found!")
})

app.listen((process.env.PORT || 3000), () => {
    console.log("Server up");
});

//