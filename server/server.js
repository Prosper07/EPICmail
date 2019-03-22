// server.js
import {Pool} from 'pg';
import dotenv from 'dotenv'; 

import express from 'express';
import '@babel/polyfill';
import Contr from '../src/usingDB/controllers/Controller';
import bodyParser from 'body-parser';

import router from './routes/user/routes';
import router3 from './routes/sent/routes';
import router5 from './routes/inbox/routes';


dotenv.config();

const pool = new Pool({
  connectionString : process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const User = Contr;
const app = express()


app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())


// Managing data structure routes
app.use(router);
app.use(router3);
app.use(router5);

//welcome page
app.get('/', (req, res) => {
  return res.status(200).send({'message': 'WELCOME TO EPICMAIL APP!'});
});


//database routes
app.post('/api/v2/users/deletegroup', User.deletegroup);
app.post('/api/v2/users/creategroup', User.creategroup);
app.post('/api/v2/users/signup', User.signup);
app.post('/api/v2/users', User.verifyToken ,User.getAll);
app.post('/api/v2/users/login', User.signin);

app.listen(process.env.PORT || 5540, () =>{
  createTables();
  console.log('listenning on port 5540')
})

/**
 * Create  Tables
 */
const createTables = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS
      groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        roledescription VARCHAR(255) NOT NULL,
        owner integer NOT NULL
      );
      CREATE TABLE IF NOT EXISTS
      message(
        id SERIAL PRIMARY KEY,
        createdOn TIMESTAMP,
        subject VARCHAR (50) NOT NULL,
        message TEXT NOT NULL,
        parentMessageId integer,
        status VARCHAR (50),
        senderId integer NOT NULL,
        receiverId integer NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      console.log("success");
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}