//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Import the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const {expect} = chai;
chai.use(chaiHttp);

/*
  * Test the /GET route
  */
  describe('/GET Users', () => {
      it('it should GET all the users', () => {
        chai.request(app)
            .get('/api/v1/passwordusers')
            .end((err, res) => {
              console.log(res.body)
                  expect(res.body).to.be.an('array')
                  expect(res).to.have.property('status')
            });
      });
  });