const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup
mongoose.connect('mongodb://localhost/tsaAuth', function(err, db) {
    if (err) {
        console.log('Unable to connect to the DB. Please start Error:', err);
    } else {
        console.log('Connected to DB successfully!');
    }
});

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}))
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ' + port)
