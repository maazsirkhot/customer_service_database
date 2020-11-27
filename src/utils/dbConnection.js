const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 100,
  port: '3306',
  host: 'customer-service.cwxspapanmnt.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'k9429098181',
  database: 'customer_service',
  debug: false,
  multipleStatements: true,
});

module.exports = pool;
