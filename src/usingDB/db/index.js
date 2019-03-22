// src/usingDB/models/index.js
const pg = require('pg');
const {Pool} = require('pg');

const config = {
  Host: 'ec2-75-101-131-79.compute-1.amazonaws.com',
  Database: 'd3kl8aqsvpjoa',
  User: 'eoifyudvsrleapb', //this is the db user credential
  Port: 5432,
  password: '5e5a6878845c8582f0893dfb4e2a08d63dc071d54b7db6885170bf6d9f39235b',
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