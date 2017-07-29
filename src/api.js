var request = require('request');
var dbController = require("./dbController.js")

var apiKey = "AIzaSyC1XRJsXhSM4KdmmXmXKBrWBUaMueYWvNg";
var engineId = "002782723745373797799:udgp1seawf4";

function parseResult(result) {
    var parsed = [];
    for(var i = 0; i < result.length; i++) {
        parsed.push({
            title: result[i].title,
            link: result[i].link,
            snippet: result[i].snippet,
            thumbnail: result[i].image.thumbnailLink
        });
    }
    return parsed;
}

module.exports = function api(res, searchQuery, offset) {
    var url = "https://www.googleapis.com/customsearch/v1?q=" + searchQuery + "&cx=" + engineId + "&searchType=image&key=" + apiKey;
    if (offset) {
        url += "&start=" + offset;
    }
    request(url, function(err, resRequest, body) {
        if(err){
            return console.log('Error:', err);
        }
        //Check for right status code
        else if(resRequest.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', resRequest.statusCode);
        }
        else {
            var result = parseResult(JSON.parse(body).items);
            var d = new Date();
            var currentDate = d.getTime();
            dbController.create({date: currentDate, term: searchQuery})
            res.send(result);
        }
    })
}