const { Pool } = require('pg');
const Router = require('express-promise-router');
const keys = require('../config/keys');
const { query } = require('express');
const bcrypt = require('bcrypt');


const pool = new Pool({
    connectionString: keys.posgresqlURI,
    ssl: process.env.DATABASE_URL ? true : false
});

pool.connect();

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;