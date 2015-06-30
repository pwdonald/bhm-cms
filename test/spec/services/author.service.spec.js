var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	SectionModel = require('../../../models/section/section.model');

chai.use(sinonChai);

describe('Author Service', function() {
	var sandbox;
	
	describe('#create(id, dto)', function() {
		it('should create a new author with id', function(done) {
			
		});
	});
	
	describe('#get(id)', function() {
		it('should return some data specific to id', function(done) {
			
		});
	});
	
	describe('#getList(searchTerm, page)', function() {
		it('should return a list of author data paginated', function(done){
			
		});
	});
	
	describe('#update(id, dto)', function() {
		it('should update the id with the data transfer object', function(done){
			
		});
	});
	
	describe('#delete(id)', function() {
		it('should remove the id from the data source', function(done) {
			
		});
	});
});