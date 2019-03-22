import {Pool} from 'pg';
import dotenv from 'dotenv'; 

dotenv.config();

const pool = new Pool({
  connectionString : process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the Database');
});


/**
 * Create Message Table
 */
const createMessageTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
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

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL
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

/**
 * Create Group Table
 */
const createGroupTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      groups (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        roledescription VARCHAR(255) NOT NULL,
        owner integer NOT NULL
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

/**
 * Drop Message Table
 */
const dropMessageTable = () => {
  const queryText = 'DROP TABLE IF EXISTS message returning *';
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

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
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

/**
 * Drop Group Table
 */
const dropGroupTable = () => {
  const queryText = 'DROP TABLE IF EXISTS groups returning *';
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


module.exports = {
  createMessageTable,
  createUserTable,
  createGroupTable,
  dropUserTable,
  dropMessageTable,
  dropGroupTable
};

require('make-runnable');