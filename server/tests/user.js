//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();


chai.use(chaiHttp);

/*
  * Test the /GET route
  */
  describe('/GET Users', () => {
      it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                  res.should.have.status(202);
                  res.body.should.be.an('object');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });