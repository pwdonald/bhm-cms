/// <reference path="../_references.d.ts" />
var util = require('util');
var Sqlite3DAL = require('../dataaccess/sqlite3/sqlite3.dal');
var BaseService = (function () {
    function BaseService() {
    }
    Object.defineProperty(BaseService.prototype, "entityName", {
        get: function () {
            return this._entityName;
        },
        set: function (v) {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseService.prototype, "dataAcceesLayer", {
        get: function () {
            return this._dataAcceesLayer;
        },
        set: function (v) {
            this._dataAcceesLayer = v;
        },
        enumerable: true,
        configurable: true
    });
    BaseService.GetInstance = function (entityTable, callback) {
        var _instance = new BaseService();
        _instance._entityName = entityTable.name;
        _instance.dataAcceesLayer = new Sqlite3DAL(entityTable, function (dal) {
            _instance.dataAcceesLayer = dal;
            callback(_instance);
        });
    };
    BaseService.prototype.get = function (id, callback) {
        var sqlQuery = util.format('SELECT * FROM %s WHERE id = %s', this.entityName, id);
        this.dataAcceesLayer.get(sqlQuery, [], callback);
    };
    BaseService.prototype.getList = function (searchTerm, column, pageNumber, perPage, callback) {
        var searchParameters = [
            this.entityName,
            searchTerm,
            (pageNumber * perPage),
            column.name,
            perPage
        ];
        var sqlQuery = util.format('SELECT * FROM %s WHERE %s LIKE \'%s\' AND id > %d ORDER BY id, %s LIMIT %d', searchParameters);
        this.dataAcceesLayer.query(sqlQuery, [], callback);
    };
    BaseService.prototype.update = function (id, dto, callback) {
        var sqlQuery = util.format('UPDATE %s ', this.entityName);
        var dtoKeys = Object.getOwnPropertyNames(dto);
        dtoKeys.forEach(function (key, index) {
            if (index > 0) {
                sqlQuery.concat(util.format(', %s = \'%s\'', key, dto[key]));
            }
            else {
                sqlQuery.concat(util.format('SET %s = \'%s\', ', key, dto[key]));
            }
        });
        sqlQuery.concat(util.format(' WHERE %s = %s', 'id', id));
        this.dataAcceesLayer.query(sqlQuery, [], function (err, results) {
            if (err) {
                callback(err, null);
            }
            callback(null, results[0]);
        });
    };
    BaseService.prototype.remove = function (id, callback) {
    };
    return BaseService;
})();
module.exports = BaseService;
//# sourceMappingURL=base.service.js.map