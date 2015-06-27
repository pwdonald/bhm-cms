var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect;

chai.use(sinonChai);

it('should be able to require the AuthorModel module', function (done) {
	try {
		AuthorModel = require('../../models/author.model');
	} catch (e) {
		done(e);
	}
});

describe('Author Model', function () {
	var sandbox,
		AuthorModel,
		author;

	beforeEach(function (done) {
		sandbox = sinon.sandbox.create();
		author = new AuthorModel();
		done();
	});

	describe('#getAuthorInfo(callback)', function () {
		it('should return an author model', function () {
			try {
				var authorInfo = author.getAuthorInfo(),
					expectedKeys = [
						'id',
						'firstname',
						'lastname',
						'alias',
						'email',
						'phone',
						'location'
					];
			} catch (e) {
				return e;
			}

			expect(authorInfo).to.contain.all.keys(expectedKeys);
		});
	});

	describe('#getRecentPosts(num, callback)', function () {
		var recentPosts;

		before(function (done) {
			recentPosts = author.getRecentPosts(5, done);
		});

		it('should return a list of recent posts', function (done) {
			try {
				var expectedKeys = [
					'count',
					'posts'
				];
			} catch (e) {
				return e;
			}
			expect(recentPosts).to.contain.all.keys(expectedKeys);
		});
	});

	describe('#updateField(field, value, callback)', function () {
		before(function (done) {
			author.updateField('name', 'tester', done);
		});

		it('should update the specified field with the provided value', function (done) {
			try {
				expect(author.name).to.equal('tester');
				done();
			} catch (e) {
				return e;
			}
		});
	});

	afterEach(function (done) {
		sandbox.restore();
		done();
	});
});