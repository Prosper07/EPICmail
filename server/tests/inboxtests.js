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
      it('it should GET inbox messages of user with Id 7 and password 7', () => {
        chai.request(app)
            .get('/api/v1/inbox/7/7')
            .end((err, res) => {
              console.log(res.body)
                  expect(res).to.have.property('status')
            });
      });
      it('it should GET all unread message of user with Id 7 ', () => {
        chai.request(app)
            .get('/api/v1/inbox/7/unread')
            .end((err, res) => {
              console.log(res.body)
                  expect(res).to.have.property('status')
            });
      });
  });