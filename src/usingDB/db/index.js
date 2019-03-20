// src/usingDB/models/index.js
const pg = require('pg');
const {Pool} = require('pg');

const config = {
    user: 'epicmailapi', //this is the db user credential
    database: 'epicmailapidb',
    password: '1111',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
  };

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database...');
});

export default {
   query (text, params, callback){
     return pool.query(text, params, callback)
   }
}