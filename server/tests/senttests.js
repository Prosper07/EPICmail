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
      it('it should GET all messages', () => {
        chai.request(app)
            .get('/api/v1/passwordmessages')
            .end((err, res) => {
              console.log(res.body)
                  expect(res.body).to.be.an('array')
                  expect(res).to.have.property('status')
            });
      });
      it('it should GET a given user with a given ID', () => {
        chai.request(app)
            .get('/api/v1/sent/1/7')
            .end((err, res) => {
              console.log(res.body)
                  expect(res.body).to.be.an('array')
                  expect(res).to.have.property('status')
            });
      });
      it('it should GET all unread message of user with Id 7 ', () => {
        chai.request(app)
            .get('/api/v1/inbox/1/unread')
            .end((err, res) => {
              console.log(res.body)
                  expect(res.body).to.be.an('array')
                  expect(res).to.have.property('status')
            });
      });
      it('should respond with redirect on post', function(done) {
        chai.request(app)
          .post('/api/v1/sent')
          .send({ "subject": "Bootcamp",
          "message": "This Is Andela",
          "parentMessageId": 3,
          "status": "read",
          "senderId": 3,
          "receiverIndivId": 4,
          "confidential": {
          "messageCode": "888"
             }})
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) done(err);
            res.body.should.have.property("subject");
          });
          done();
      });
  });