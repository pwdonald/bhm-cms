var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	AuthorService = require('../../../services/author/author.service');

chai.use(sinonChai);

describe('Author Service', function () {
	var FAKE_ID = 0;
	var sandbox;

	beforeEach(function (done) {
		sandbox = sinon.sandbox.create();
		AuthorService.GetInstance(function (_service) {
			sandbox.service = _service;
			done();
		});
	});

	afterEach(function () {
		sandbox.restore();
	});

	describe('#create(dto, callback)', function () {
		var authorDto = {
			firstname: 'test',
			lastname: 'test',
			alias: 'test'
		},
			newAuthor;

		before(function (done) {
			sandbox = sinon.sandbox.create();
			AuthorService.GetInstance(function (_service) {
				_service.create(authorDto, function (err, _author) {
					if (err) {
						done(err);
					}
					newAuthor = _author;
					done();
				});
			});
		});
		
		it('should create a new author with id', function (done) {
			// expect(sandbox.service.create).to.have.been.called;
			expect(newAuthor).to.equal(authorDto);
			done();
		});
	});

	describe('#get(id, callback)', function () {
		var rtnAuthor;

		it('should return some data specific to id', function (done) {
			before(function (done) {
				try {
					sandbox.service.get(FAKE_ID, function (_author) {
						rtnAuthor = _author;
						done();
					});
				} catch (e) {
					done(e);
				}
			});

			it('should return a specific author with the given id', function (done) {
				expect(rtnAuthor).to.be.an.object;
				done();
			});
		});
	});

	describe('#getList(searchTerm, page, callback)', function () {
		var rtnAuthorList;

		before(function (done) {
			try {
				sandbox.service.getList('term', 1, function (_list) {
					rtnAuthorList = _list;
					done();
				});
			} catch (e) {
				done(e);
			}
		});

		it('should return a list of author data paginated', function (done) {
			expect(rtnAuthorList).to.be.an.array;
			done();
		});
	});

	describe('#update(id, dto, callback)', function () {
		var updatedAuthor;

		before(function (done) {
			try {
				sandbox.service.update(FAKE_ID, { firstname: 'test' }, function (_updated) {
					updatedAuthor = _updated;
					done();
				});
			} catch (e) {
				done(e);
			}
		});

		it('should update the id with the data transfer object', function (done) {
			expect(updatedAuthor).to.be.an.object;
			expect(updatedAuthor.firstname).to.equal('test');
			done();
		});
	});

	describe('#remove(id, callback)', function () {
		var result;

		before(function (done) {
			try {
				sandbox.service.remove(FAKE_ID, function (success) {
					result = success;
					done();
				});
			} catch (e) {
				done(e);
			}
		});

		it('should remove the id from the data source', function (done) {
			expect(result).to.be.true;
			done();
		});
	});
});