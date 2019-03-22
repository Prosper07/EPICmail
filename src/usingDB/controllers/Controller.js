import db from '../db/index';
import Helper from './Helper';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const Contr = {
  async signup(req, res) {
    const password = req.body.password;
    if (!req.body.email || !password) {
      return res.status(400).send({'message': 'Both email and password are mendatory'});
    } else if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ 'message': 'Please enter a valid email address' });
    } else if (password.length < 5 || password.length > 10) {
      return res.status(400).send({ 'message': 'The password should have characters more than 4 or less than 11' });
    } else {
    const hashPassword = Helper.hashPassword(password);
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
          error : err+""
        })
      } else {
      res.json({
        message : " Congratulation, you now have an EPICmail account!",
        data:result.rows
        })
      }
    });
    }
  },

  async creategroup(req, res) {
    if (!req.body.name || !req.body.roledescription || !req.body.owner) {
      return res.status(400).send({'message': 'All the fields (name, roledescription, owner) mendatory!'});
    } else {
    const createGroup = `INSERT INTO
    groups( name, roledescription, owner) VALUES($1, $2, $3) returning *`;
    const values = [
      req.body.name,
      req.body.roledescription,
      req.body.owner
    ];
      db.query(createGroup, values, (err, result) => {
              if(err){
                res.status(500).json({
                  status: 500,
                  error : err+""
                })
              } else {
                    res.json({
                      message : " Congratulation, you have created a group!",
                      data:result.rows
                    })
                  }
            });
          
    };
    },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    const {rows}= await db.query(findAllQuery);
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

  async deletegroup(req, res) {
    const deleteQuery = 'DELETE FROM groups WHERE id=$1 returning *';
      const { rowCount } = db.query(deleteQuery, [req.params.id]);
      if( rowCount == 0 ) {
        return res.status(404).json({'message': 'group not found'});
      } else {
      return res.status(204).json({ message: 'deleted' });
      }
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
    if ( Object.entries(rows).length == 0 ) {
      return res.status(400).send({ 'message': 'User with this email does not exists in the system' });
    } else {
    
    const a = rows[0].password;
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