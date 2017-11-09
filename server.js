const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const PORT = 4000;
const path = require('path');
//Use Career Fair Schema
const schemaCF = require('./schema/_schema_cf.js');

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

//allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


app.use('/graphql', expressGraphQL({
    schema: schemaCF,
    graphiql: true //set able to use the graphQL web IDE to true
}));

app.listen(PORT, () => {
    console.log("React, Redux and GraphQL Server is now running on port " + PORT);
});

//app.get('/', function (req, res, next) {
//    res.sendFile(__dirname + '/www/index.html');
//});

app.get('/login', function (req, res, next) {
    res.send("auth");
    //res.sendFile(__dirname + '/public/index.html');
});

app.get('*', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});

