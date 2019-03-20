// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

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
        subject TEXT NOT NULL,
        content TEXT NOT NULL,
        receiver_id TEXT NOT NULL,
        sender_id SERIAL NOT NULL,
        FOREIGN KEY (sender_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
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
        name VARCHAR(128) NOT NULL
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
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
const dropReflectionTable = () => {
  const queryText = 'DROP TABLE IF EXISTS reflections returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
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
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createReflectionTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropReflectionTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createMessageTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropReflectionTable,
  dropAllTables
};

require('make-runnable');