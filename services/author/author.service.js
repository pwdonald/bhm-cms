/// <reference path="../../_references.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var BaseService = require('../base.service');
var AuthorService = (function (_super) {
    __extends(AuthorService, _super);
    function AuthorService() {
        _super.call(this);
    }
    AuthorService.SetupTable = function () {
        var table = _super.SetupTable.call(this);
        table.name = 'authors';
        table.columns.push({
            name: 'firstname',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'lastname',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'alias',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'email',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'phone',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'location',
            type: 'text',
            key: false
        });
        table.columns.push({
            name: 'registerDate',
            type: 'text',
            key: false
        });
        return table;
    };
    AuthorService.prototype.getList = function (searchTerm, pageNumber, perPage, callback, searchType) {
        _super.prototype.getList.call(this, searchTerm, pageNumber, perPage, callback, searchType);
    };
    return AuthorService;
})(BaseService);
module.exports = AuthorService;
//# sourceMappingURL=author.service.js.map