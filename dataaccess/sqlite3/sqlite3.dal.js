/// <reference path="../../_references.d.ts" />
var util = require('util');
var sqlite3 = require('sqlite3');
var config = require('../../package.json');
var Sqlite3DAL = (function () {
    function Sqlite3DAL(table, callback, dbName) {
        var _this = this;
        if (dbName === void 0) { dbName = config.data.name; }
        this.table = table;
        this.initialize(dbName, function () {
            callback(_this);
        });
    }
    Sqlite3DAL.CreateTableStatement = function (tableName, columns) {
        var sqlStatement = util.format('CREATE TABLE IF NOT EXISTS %s ', tableName), columnParams = '';
        columns.forEach(function (column, index) {
            if (index > 0) {
                columnParams = columnParams.concat(', ');
            }
            if (column.key) {
                columnParams = columnParams.concat(util.format('%s %s PRIMARY KEY autoincrement ', column.name, column.type));
            }
            else if (column.defaultValue) {
                columnParams = columnParams.concat(util.format('%s %s DEFAULT %s', column.name, column.type, column.defaultValue));
            }
            else {
                columnParams = columnParams.concat(util.format('%s %s', column.name, column.type));
            }
        });
        return util.format('%s (%s)', sqlStatement, columnParams);
    };
    Sqlite3DAL.prototype.initialize = function (dbName, callback) {
        var _this = this;
        this._db = new sqlite3.Database(dbName, function (err) {
            if (err) {
                throw err;
            }
            var dbStart = Sqlite3DAL.CreateTableStatement(_this.table.name, _this.table.columns);
            _this._db.run(dbStart, function (err) {
                if (err) {
                    throw err;
                }
                callback();
            });
        });
    };
    Sqlite3DAL.prototype.run = function (statement, callback) {
        this._db.run(statement, function (err) {
            var statementResult = this;
            callback(err, this.lastID, this.changes);
        });
    };
    Sqlite3DAL.prototype.query = function (statement, callback) {
        var results = [];
        this._db.each(statement, function (err, result) {
            if (err) {
                callback(err, []);
            }
            results.push(result);
        }, function (err, count) {
            if (err) {
                callback(err, []);
            }
            callback(null, results);
        });
    };
    Sqlite3DAL.prototype.get = function (statement, callback) {
        this._db.get(statement, callback);
    };
    Sqlite3DAL.prototype.all = function (statement, callback) {
        this._db.all(statement, callback);
    };
    return Sqlite3DAL;
})();
module.exports = Sqlite3DAL;
//# sourceMappingURL=sqlite3.dal.js.map