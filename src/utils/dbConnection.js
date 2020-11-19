const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  port: '3306',
  host: 'customerservice.ciea7s8xmtar.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'customer_service',
  debug: false,
  multipleStatements: true,
});

module.exports = pool;
