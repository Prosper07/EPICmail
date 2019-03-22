// db.js
const { Pool } = require('pg');

const pg = require('pg');

const config = {
  host: 'ec2-75-101-131-79.compute-1.amazonaws.com',
  database: 'pd3kl8aqsvpjoa',
  user: 'oifyudvsrleapb',
  port: 5432,
  password: '5e5a6878845c8582f0893dfb4e2a08d63dc071d54b7db6885170bf6d9f39235b'
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