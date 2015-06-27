var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require('sinon-chai'),
	expect = chai.expect,
	PageModel = require('../../../models/page/page.model');

chai.use(sinonChai);

describe('Page Model', function () {
	var sandbox,
		page,
		existingSection = { id: '0' };

	beforeEach(function (done) {
		sandbox = sinon.sandbox.create();
		page = PageModel.GetInstance({
			id: 0,
			title: 'Test Page',
			description: 'Just a test page.',
			tags: 'test, page',
			author: {},
			created: new Date(2013, 1, 1),
			modified: new Date(2013, 1, 1),
			modifiedBy: {},
			views: 0,
			sections: [existingSection]
		});
		done();
	});

	describe('#getPageInfo()', function () {
		var expectedKeys = [
			'id',
			'title',
			'description',
			'tags',
			'author',
			'created',
			'modified',
			'modifiedBy',
			'views',
			'sections'
		];


		it('should return a page model dto', function () {
			expect(page.getPageInfo()).to.contain.all.keys(expectedKeys);
		});
	});

	describe('#addChildSection(section, callback)', function () {
		var childSection = {id:'1'},
			updatedPage;

		before(function (done) {
			page.addChildSection(childSection, function (_updatedPage) {
				updatedPage = _updatedPage;
				done();
			});
		});

		it('should add the child section to the page', function () {
			expect(updatedPage.sections).to.contain(childSection);
		});
	});

	describe('#removeChildSection(id, callback)', function () {
		var updatedPage;
		
		before(function(done){
			page.removeChildSection(existingSection.id, function(_updatedPage) {
				updatedPage = _updatedPage;
				done();
			});
		});
		
		it('should remove the child section from the page', function(){
			expect(updatedPage.sections).to.not.include(existingSection);
		});
	});

	describe('#save', function () {
		var savedModel;

		before(function (done) {
			page.save(function (r) {
				savedModel = r;
				done();
			});
		});

		it('should return th e saved model', function (done) {
			expect(savedModel).to.eql(page);
			done();
		});
	});

	afterEach(function (done) {
		sandbox.restore();
		done();
	});


});