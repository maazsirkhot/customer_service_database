const port = process.env.PORT || 3001;
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const pool = require('./src/utils/dbConnection');

app.use(
  session({
    secret: 'customer_service',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }),
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

pool.getConnection((error) => {
  if (error) throw error;
  console.log('Database Connected');
});

// const basePath = '/';
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port);
console.log(`Server Listening on port ${port}`);
