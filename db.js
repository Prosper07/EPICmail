// db.js
const { Pool } = require('pg');

const pg = require('pg');

const config = {
    user: 'epicmailapi', //this is the db user credential
    database: 'propser',
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
      group(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        roleDescription VARCHAR(255) NOT NULL,
        Owner VARCHAR (255) NOT NULL
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
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS group returning *';
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
  dropUserTable
};

require('make-runnable');