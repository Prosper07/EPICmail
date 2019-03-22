var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Create user', () => {
    it('should get all the users', function(done){
        chai.request(server)
        .get('/api/v2/users')
        .end(function(err, res){
            res.body.should.have.status(403);
            done();
        });
    });

    it('should not register an existing user', (done) => {
        chai.request(server)
        .post('/api/v2/users/signup')
        .send({
            "password": "11111",
            "email": "b@gamail.com"
        })
        .end((err, res) => {
            res.body.should.have.status(500)
            done()
        })
})
})