var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	AuthorModel = require('../../../models/author/author.model');

chai.use(sinonChai);

describe('Author Model', function () {
	var sandbox,
		author;

	beforeEach(function (done) {
		sandbox = sinon.sandbox.create();
		author = AuthorModel.GetInstance({
			id: 0,
			firstname: 'Tester',
			lastname: 'McTesterson',
			alias: 'Test',
			phone: '555-555-5555',
			email: 'test@test.com',
			location: 'USA',
			registerDate: new Date(2015, 1, 1)
		});
		done();
	});

	describe('#getAuthorInfo()', function () {
		it('should return an author model', function () {
			var expectedKeys = [
				'id',
				'firstname',
				'lastname',
				'alias',
				'email',
				'phone',
				'location',
				'registerDate'
			];
			try {
				var authorInfo = author.getAuthorInfo();
			} catch (e) {
				return e;
			}

			expect(authorInfo).to.contain.all.keys(expectedKeys);
		});
	});

	describe('#save(callback)', function (done) {
		var savedModel;

		before(function (done) {
			author.save(function (r) {
				savedModel = r;
				done();
			});
		});

		it('should return the saved model', function (done) {
			expect(savedModel).to.eql(author);
			done();
		});
	});

	afterEach(function (done) {
		sandbox.restore();
		done();
	});
});