const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
const serveStatic = require('serve-static')


//middlewares
require('dotenv').config();
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ["set-cookie"]
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));

//here we are configuring dist to serve app files
app.use(serveStatic(__dirname + '/dist'));

// this * route is to serve project on different page routes except root `/`
//app.get(/.*/, function(req, res) {
//   res.sendFile(path.join(__dirname, '/dist/index.html'))
//})

const port = process.env.PORT || 3000
    // Routes
app.use(require(path.join(__dirname + '/routes/index')));


app.listen(port)
console.log(`Server on port ${port}`)