var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	SectionModel = require('../../../models/section/section.model');

chai.use(sinonChai);

describe('Section Model', function() {
	var sandbox,
		section;
		
	beforeEach(function(done) {
		sandbox = sinon.sandbox.create();
		section = SectionModel.GetInstance({
			id: 0,
			title: 'Test Section',
			subtitle: 'Sub Test',
			author: {id: '0'},
			createdOn: new Date(2015, 1, 1),
			modifiedBy: {id:'0'},
			modifiedOn: new Date(2015, 1, 2),
			markdown: 'down',
			otherContent: {
				'listings': [
					'listitem1',
					'listitem2'
				],
				side: {
					content: 'Content Test'
				}
			}
		});
		done();
	});
	
	describe('#getSectionInfo', function() {
		var expectedKeys = [
			'id',
			'title',
			'subtitle',
			'author',
			'createdOn',
			'modifiedOn',
			'modifiedBy',
			'markdown',
			'otherContent'
		];
		
		it('should return section model dto', function() {
			expect(section.getSectionInfo()).to.contain.all.keys(expectedKeys);
		});
	});
	
	describe('#save', function(){
		var savedModel;
		
		before(function(done) {
			section.save(function(r) {
			savedModel = r;
			done();
			});
		});
		
		it('should return a saved model', function (done) {
			expect(savedModel).to.eql(section);
			done();
		});
	});
	
	afterEach(function(done) {
		sandbox.restore();
		done();
	});
});