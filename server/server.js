// server.js
import express from 'express';
import '@babel/polyfill';
import Contr from '../src/usingDB/controllers/Controller';
import bodyParser from 'body-parser';

import router from './routes/user/routes';
import router3 from './routes/sent/routes';
import router5 from './routes/inbox/routes';


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
app.post('/api/v2/users/creategroup', User.verifyToken ,User.creategroup);
app.post('/api/v2/users/signup', User.signup);
app.post('/api/v2/users', User.verifyToken ,User.getAll);
app.post('/api/v2/users/login', User.signin);

app.listen(5540)
console.log('app running on port ', 5540);