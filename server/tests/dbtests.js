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
            res.should.have.status(200);
            done();
        });
    });
});