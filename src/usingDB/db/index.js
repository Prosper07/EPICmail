// src/usingDB/models/index.js
import {Pool} from 'pg';
import dotenv from 'dotenv'; 

dotenv.config();

const pool = new Pool({
  connectionString : process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the Database...');
});

export default {
   query (text, params, callback){
     return pool.query(text, params, callback)
   }
}