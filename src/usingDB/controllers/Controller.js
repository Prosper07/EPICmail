import db from '../db';

const Contr = {
  async signup(req, res) {
    const createQuery = `INSERT INTO
    test( email, password) VALUES($1, $2) returning *`;
    const values = [
      req.body.email,
      req.body.password,
    ];
    db.query(createQuery, values, (err, result) => {
      if(err){
        res.status(500).json({
          status: 500,
          error : err
        })
      }
      res.send(result.rows[0])
    });
  },

  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM test';
    const {rows}= await db.query(findAllQuery);
    console.log(rows);
    res.json({
      data:rows
    })
  },

  async signin(req, res) {
    const getOne = 'SELECT * FROM test WHERE email = $1 AND password = $2';
    const {email, password} = req.body;
    const values = [email, password]
    db.query(getOne, values, (err, result) => {
      if(err){
        res.status(500).json({
          status: 500,
          error : err
        })
      }
      // if (result.rowCount == 1){ 
//
     // }
      res.send(result.rows[0])
    });
}
}

export default Contr;