// server.js
import express from 'express';
import '@babel/polyfill';
import Contr from '../src/usingDB/controllers/Controller';
import bodyParser from 'body-parser'

const User = Contr;
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'EPICMAIL APP'});
});

app.post('/api/v2/users/signup', User.signup);
app.post('/api/v2/users', User.verifyToken ,User.getAll);
app.post('/api/v2/users/login', User.signin);

app.listen(5540)
console.log('app running on port ', 5540);