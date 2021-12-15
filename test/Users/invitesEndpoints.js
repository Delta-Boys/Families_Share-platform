const common = require('../common')
const server = common.server;
const chai = common.chai;

const User = require('../../src/models/user');
const Invites = require('../../src/models/invite');


describe('/Get/api/users/invites', () => {
	it('it should return an empty array of invites', (done) => {
		User.findOne({}, (err, user) => {
			chai.request(server)
				.get(`/api/users/invites`)
				.set('Authorization', user.token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.should.have.property('length').eql(0);
					done();
				});
		});
	});
});
