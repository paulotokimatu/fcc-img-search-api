var Queries = require("../models/query.js");

module.exports = {
    create: (newQueryData) => {
        Queries.create(newQueryData, (err, newQueryResult) => {
            if (err) throw err;
            else {
                console.log(newQueryResult);
            }
        })
    },
    request:  (res) => {
        Queries.find({}, "date term").sort({date: -1}).limit(10).find((err, query) => {
            if (err) throw err;
            else {
                var result = [];
                for (var i = 0; i < query.length; i++) {
                    var d = new Date(Number(query[i].date));
                    var parsedDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + ", " + d.getHours() + ":" + d.getMinutes();
                    result.push({term: query[i].term, date: parsedDate})
                }
                res.send(result);
            }
        });
    }
}