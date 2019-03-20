// server.js
import express from 'express';
import dotenv from 'dotenv';
import '@babel/polyfill';
import ReflectionWithDB from '../src/usingDB/controllers/Reflection';

dotenv.config();
const Reflection = ReflectionWithDB;
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});

app.post('/api/v2/users', Reflection.create);

app.listen(6500)
console.log('app running on port ', 6500);