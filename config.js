const sql = require('mssql');

const config = {
    user: 'wis_prod_25may_usr',
    password: 'wis_prod_25may_usr',
    server: '103.208.202.180',
    database: 'WIS_PROD_25MAY',
    options: {
      encrypt: true,
      trustServerCertificate: true,
  
    }
  };


const pool = new sql.ConnectionPool(config);

module.exports = pool;