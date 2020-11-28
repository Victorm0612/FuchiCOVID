const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(require('./routes/index'));

app.listen(3000)
console.log('Server on port 3000')