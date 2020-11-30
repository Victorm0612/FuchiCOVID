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
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

app.listen(3000)
console.log('Server on port 3000')