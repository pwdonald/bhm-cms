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

	describe('#getList(searchTerm, page, perpage, callback, columnId)', function () {
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

	describe('#update(id, dto, callback)', function () {
		var updatedAuthor;
		var fourthAuthor = {
			firstname: 'test4',
			email: 'test4@test.com',
			location: 'testUSA',
			phone: '4444444444',
			lastname: 'test4',
			alias: 'test4'
		};

		before(function (done) {
			sandbox = sinon.sandbox.create();
			getService(function (_service) {

				_service.create(fourthAuthor, function (err, _author1) {
					if (err) {
						done(err);
					}
					_service.create(fourthAuthor, function (err, _author2) {
						if (err) {
							done(err);
						}
						_author2.firstname = 'updated';
						_author2.lastname = 'author';
						_author2.alias = 'updated_author'
						_service.update(_author2.id, _author2, function (err, result) {
							_service.get(_author2.id, function (err, _authorResult) {
								if (err) {
									done(err);
								}
								updatedAuthor = _authorResult;
								done();
							});
						});
					});
				});
			});
		});

		after(function (done) {
			sandbox.restore();
			done();
		});

		it('should update the id with the data transfer object', function (done) {
			expect(updatedAuthor).to.be.an.object;
			expect(updatedAuthor.firstname).to.equal('updated');
			done();
		});
	});

	describe('#remove(id, callback)', function () {
		var successResult;
		var returnedResult;
		
		var fifthAuthor = {
			firstname: 'test5',
			email: 'test5@test.com',
			location: 'testUSA',
			phone: '5555555555',
			lastname: 'test5',
			alias: 'test5'
		};

		before(function (done) {
			sandbox = sinon.sandbox.create();
			getService(function (_service) {

				_service.create(fifthAuthor, function (err, _author1) {
					if (err) {
						done(err);
					}
					_service.create(fifthAuthor, function (err, _author2) {
						if (err) {
							done(err);
						}
						
						_service.remove(_author2.id, function(err, success) {
							if (err) {
								done(err);
							}
							
							successResult = success;
							
							_service.get(_author2.id, function(err, result) {
								if (err) {
									console.log('get removed: ' + _author2.id + ' ' + err);
									done(err);
								}
								
								returnedResult = result;
								
								done();
							});
						});
						
					});
				});
			});
		});


		it('should remove the id from the data source', function (done) {
			expect(successResult).to.be.true;
			expect(returnedResult).to.be.an.array;
			done();
		});
	});
});