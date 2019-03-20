// src/usingDB/models/index.js
import dotenv from 'dotenv';

dotenv.config();

const pg = require('pg');

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
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}