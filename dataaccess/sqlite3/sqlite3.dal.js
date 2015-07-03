/// <reference path="../../_references.d.ts" />
var util = require('util');
var sqlite3 = require('sqlite3');
var Sqlite3DAL = (function () {
    function Sqlite3DAL(table, callback) {
        var _this = this;
        this.table = table;
        this.initialize(function () {
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
                columnParams = columnParams.concat(util.format('%s %s PRIMARY KEY ', column.name, column.type));
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
    Sqlite3DAL.prototype.initialize = function (callback) {
        var _this = this;
        this._db = new sqlite3.Database('data.db', function (err) {
            if (err) {
                throw err;
            }
            var dbStart = Sqlite3DAL.CreateTableStatement(_this.table.name, _this.table.columns);
            console.log(dbStart);
            _this._db.run(dbStart, function (err) {
                if (err) {
                    throw err;
                }
                callback();
            });
        });
    };
    Sqlite3DAL.prototype.query = function (statement, parameters, callback) {
        var results = [];
        this._db.each(statement, parameters, function (err, result) {
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
    Sqlite3DAL.prototype.get = function (statement, parameters, callback) {
        this._db.get(statement, parameters, callback);
    };
    Sqlite3DAL.prototype.all = function (statement, parameters, callback) {
        this._db.all(statement, parameters, callback);
    };
    return Sqlite3DAL;
})();
module.exports = Sqlite3DAL;
//# sourceMappingURL=sqlite3.dal.js.map