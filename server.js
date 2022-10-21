// server.js
const express = require('express');
const app = express();
const cors = require("cors");
const session = require("express-session");
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist/siach-web'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 4200);
const path = require('path');
app.use(
    session({
        secret: 'cleber bolos',
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: false, // must be true if sameSite='none'
        }
    })
);

app.use(cors({
    origin: app.get('env') === 'production' ? 'https://siach-api.herokuapp.com/' : 'http://localhost:8080/',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true,
}));
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/siach-web/index.html'));
});