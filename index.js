const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')


//middlewares
require('dotenv').config();
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ["set-cookie"]
};

app.use('/', serveStatic(path.join(__dirname, '/dist')))

app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./api/src/routes/index'));

app.get(/.*/, function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080

app.listen(port)
console.log('Server on port 3000')