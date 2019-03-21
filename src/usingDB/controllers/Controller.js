import db from '../db';
import Helper from './Helper';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const Contr = {
  async signup(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Both email and password are mendatory'});
    } else if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    } else {
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO
    users( email, password) VALUES($1, $2) returning *`;
    const values = [
      req.body.email,
      hashPassword,
    ];
    db.query(createQuery, values, (err, result) => {
      if(err){
        res.status(500).json({
          status: 500,
          error : "Internal error or email already exists"
        })
      } else {
      res.json({
        message : " Congratulation, you now have an EPICmail account!",
        data:values
        })
      }
    });
    }
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    const {rows}= await db.query(findAllQuery);
    console.log(rows);
    jwt.verify(req.token, 'secret', (err, authData) => {
      if(err){
        res.sendStatus(403);
      } else {
        res.json({
          authData,
          data:rows
        })
      }
    })
  },

  async signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({'message': 'Both email and password are mendatory'});
    } else if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    } else {
    const getOne = 'SELECT * FROM users WHERE email = $1';
    const {email, password} = req.body;
    const values = [email, password];

    const {rows}= await db.query(getOne, [req.body.email]);
    const a = rows[0].password;
console.log(a);
const isVerified = bcrypt.compareSync(req.body.password, a)
if(!isVerified){
  return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
}
jwt.sign(rows[0] ,'secret', (err, token) =>{
  res.json({
    message : " Welcome to your EPICmail account!",
    data: rows[0],
    token
  })
});
    //  res.json({
    //   message : " Welcome to your EPICmail account!",
    //   data: rows[0]
    //   })
    
    
    }
},

async verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

}


export default Contr;