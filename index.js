const express  = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");
global.APP_PATH = path.resolve(__dirname
);


var mongoose = require( 'mongoose' );
//Create the database connection
 mongoose.connect("mongodb://localhost/ReactApp");

// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to' );
});
//When the connection is disconnected
mongoose.connection.on('disconnected', function () {
 console.log('Mongoose default connection disconnected');
});


const app = express();

// tell the app to look for static files in these directories
app.use(express.static('./server/static'));
app.use(express.static('./client/dist/'));
// tell the app to parse HTTP body messages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const authRoutes = require('./server/routes/auth');
// app.use('/auth', authRoutes);
require(APP_PATH + '/server/routes/AuthRoute')(app, express);
//start the server
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'server/static', 'index.html'))
})
app.listen(3001, ()=>{
     console.log("Server is running on http:localhost:3001")
});
