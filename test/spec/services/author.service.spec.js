var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	AuthorService = require('../../../services/author/author.service');

chai.use(sinonChai);

describe('Author Service', function () {
	var FAKE_ID = 1;
	var newAuthor;

	var getService = function (callback) {
		AuthorService.GetInstance(function (_service) {
			callback(_service);
		}, ':memory:');
	};

	describe('#create(dto, callback)', function () {
		var sandbox;

		var authorDto = {
			firstname: 'test',
			lastname: 'test',
			alias: 'test'
		};

		before(function (done) {
			sandbox = sinon.sandbox.create();
			getService(function (_service) {
				_service.create(authorDto, function (err, _author) {
					if (err) {
						done(err);
					}
					newAuthor = _author;
					done();
				});
			});
		});

		after(function (done) {
			sandbox.restore();
			done();
		});

		it('should create a new author with id', function (done) {
			expect(newAuthor.id).to.exist;
			expect(newAuthor).to.equal(authorDto);
			done();
		});
	});

	describe('#get(id, callback)', function () {
		var rtnAuthor;
		var sandbox;
		var secondAuthor = {
			firstname: 'test2',
			email: 'test2@test.com',
			location: 'testUSA',
			phone: '2222222222',
			lastname: 'test2',
			alias: 'test2'
		};

		before(function (done) {
			sandbox = sinon.sandbox.create();
			getService(function (_service) {
				_service.create(secondAuthor, function (err, _author) {
					_service.get(_author.id, function (err, _author) {
						if (err) {
							done(err);
						}

						rtnAuthor = _author;
						done();
					});
				});
			});
		});

		after(function (done) {
			sandbox.restore();
			done();
		});

		it('should return some data specific to id', function (done) {
			expect(rtnAuthor.id).to.exist;
			expect(rtnAuthor.firstname).to.equal('test2');
			done();
		});
	});

	describe('#getList(searchTerm, page, callback)', function () {
		var rtnAuthorList;
		var sandbox;
		var thirdAuthor = {
			firstname: 'test3',
			email: 'test3@test.com',
			location: 'testUSA',
			phone: '3333333333',
			lastname: 'test3',
			alias: 'test3'
		};
		var SEARCHTERM = 'test';

		before(function (done) {
			sandbox = sinon.sandbox.create();
			getService(function (_service) {

				_service.create(thirdAuthor, function (err, _author) {
					_service.create(thirdAuthor, function (err, _author) {
						_service.getList(SEARCHTERM, 0, 10, function (err, _results) {
							if (err) {
								done(err);
							}

							rtnAuthorList = _results;

							done();
						}, 1);
					});
				});
			});
		});

		after(function (done) {
			sandbox.restore();
			done();
		});

		it('should return a list of author data paginated', function (done) {
			expect(rtnAuthorList).to.be.an.array;
			expect(rtnAuthorList.length).to.equal(2);
			expect(rtnAuthorList[0]).to.exist;
			expect(rtnAuthorList[0].firstname).to.equal(thirdAuthor.firstname);
			expect(rtnAuthorList[0].lastname).to.equal(thirdAuthor.lastname);
			done();
		});
	});

	// describe('#update(id, dto, callback)', function () {
	// 	var updatedAuthor;

	// 	before(function (done) {
	// 		try {
	// 			sandbox.service.update(FAKE_ID, { firstname: 'test' }, function (_updated) {
	// 				updatedAuthor = _updated;
	// 				done();
	// 			});
	// 		} catch (e) {
	// 			done(e);
	// 		}
	// 	});

	// 	it('should update the id with the data transfer object', function (done) {
	// 		expect(updatedAuthor).to.be.an.object;
	// 		expect(updatedAuthor.firstname).to.equal('test');
	// 		done();
	// 	});
	// });

	// describe('#remove(id, callback)', function () {
	// 	var result;

	// 	before(function (done) {
	// 		try {
	// 			sandbox.service.remove(FAKE_ID, function (success) {
	// 				result = success;
	// 				done();
	// 			});
	// 		} catch (e) {
	// 			done(e);
	// 		}
	// 	});

	// 	it('should remove the id from the data source', function (done) {
	// 		expect(result).to.be.true;
	// 		done();
	// 	});
	// });
});