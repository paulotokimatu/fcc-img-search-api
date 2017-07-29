var express = require("express");
var app = express();
var api = require("./src/api.js");
var dbController = require("./src/dbController.js");
var mongoose = require("mongoose");

mongoose.Promise = Promise;
mongoose.connect("mongodb://tokimatu:tokimatu_image-search@ds129010.mlab.com:29010/tokimatu_image-search");

app.get("/:queryToSearch", (req, res) => {
    var offset = req.query.offset;
    var searchQuery = req.params.queryToSearch;
    
    api(res, searchQuery, offset);
});

app.get("/api/latest", (req, res) => {
    dbController.request(res);
});

app.use(function (req, res, next) {
    res.status(404).send("Page not found!")
})

app.listen((process.env.PORT || 3000), () => {
    console.log("Server up");
});

//