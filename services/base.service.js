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
    BaseService.SetupTable = function () {
        var columns = [];
        columns.push({
            name: 'id',
            type: 'integer',
            key: true
        });
        return {
            name: 'NewTable',
            columns: columns
        };
    };
    BaseService.GetInstance = function (callback, dbName) {
        var _instance = new this();
        var entityTable = _instance._table = this.SetupTable();
        _instance._entityName = entityTable.name;
        _instance.dataAcceesLayer = new Sqlite3DAL(_instance._table, function (dal) {
            _instance.dataAcceesLayer = dal;
            callback(_instance);
        }, dbName);
    };
    BaseService.prototype.create = function (dto, callback) {
        var keys = Object.getOwnPropertyNames(dto);
        keys = keys.filter(function (key) {
            if (key === 'id') {
                return false;
            }
            return true;
        });
        var sqlQuery = util.format('INSERT INTO %s (%s) VALUES (%s)', this.entityName, keys.join(','), keys.map(function (key) {
            return '\'' + dto[key] + '\'';
        }));
        this.dataAcceesLayer.run(sqlQuery, function (err, resultRowId, affectedRowCount) {
            dto.id = resultRowId;
            callback(err, dto);
        });
    };
    BaseService.prototype.get = function (id, callback) {
        var sqlQuery = util.format('SELECT * FROM %s WHERE id = %s', this.entityName, id);
        this.dataAcceesLayer.get(sqlQuery, callback);
    };
    BaseService.prototype.getList = function (searchTerm, pageNumber, perPage, callback, columnNumber) {
        if (columnNumber === void 0) { columnNumber = 0; }
        var column = this._table.columns[columnNumber];
        var sqlQuery = util.format('SELECT * FROM %s WHERE %s LIKE \'%s\' AND id > %s ORDER BY id, %s LIMIT %d', this.entityName, column.name, '%' + searchTerm + '%', (pageNumber * perPage), column.name, perPage);
        this.dataAcceesLayer.query(sqlQuery, callback);
    };
    BaseService.prototype.update = function (id, dto, callback) {
        var sqlQuery = util.format('UPDATE %s ', this.entityName);
        var dtoKeys = Object.getOwnPropertyNames(dto);
        dtoKeys.forEach(function (key, index) {
            if (key !== 'id') {
                if (index > 0) {
                    sqlQuery.concat(util.format(', %s = \'%s\'', key, dto[key]));
                }
                else {
                    sqlQuery.concat(util.format('SET %s = \'%s\', ', key, dto[key]));
                }
            }
        });
        sqlQuery.concat(util.format(' WHERE %s = %s', 'id', id));
        this.dataAcceesLayer.query(sqlQuery, function (err, results) {
            callback(err, results[0]);
        });
    };
    BaseService.prototype.remove = function (id, callback) {
    };
    return BaseService;
})();
module.exports = BaseService;
//# sourceMappingURL=base.service.js.map