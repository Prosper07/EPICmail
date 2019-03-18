DROP DATABASE IF EXISTS puppies;
CREATE DATABASE puppies;

\c puppies;

CREATE TABLE pups (
  ID SERIAL PRIMARY KEY,
  email VARCHAR,
  firstname VARCHAR,
  lastname VARCHAR,
  password VARCHAR
);

INSERT INTO pups (name, breed, age, sex)
  VALUES ('prosperkilolo@gmail.com', 'Andela', 'Bootcamp', '123');