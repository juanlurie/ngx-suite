"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var table_1 = require("@angular/cdk/table");
var Observable_1 = require("rxjs/Observable");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var TableDatabase = (function () {
    function TableDatabase(data) {
        this.dataChange = new BehaviorSubject_1.BehaviorSubject([]);
        this.dataChange.next(data);
    }
    Object.defineProperty(TableDatabase.prototype, "data", {
        get: function () { return this.dataChange.value; },
        enumerable: true,
        configurable: true
    });
    return TableDatabase;
}());
exports.TableDatabase = TableDatabase;
var TableDataSource = (function (_super) {
    __extends(TableDataSource, _super);
    function TableDataSource(database, sort, columns, paginator) {
        var _this = _super.call(this) || this;
        _this.database = database;
        _this.sort = sort;
        _this.columns = columns;
        _this.paginator = paginator;
        _this.filterChange = new BehaviorSubject_1.BehaviorSubject('');
        _this.paginatorInitialized = false;
        _this.renderedData = [];
        _this.displayDataChanges = [
            _this.database.dataChange,
            _this.sort.sortChange,
            _this.filterChange
        ];
        return _this;
    }
    Object.defineProperty(TableDataSource.prototype, "filter", {
        get: function () { return this.filterChange.value; },
        set: function (filter) { this.filterChange.next(filter); },
        enumerable: true,
        configurable: true
    });
    TableDataSource.prototype.setPaginator = function (paginator) {
        if (paginator != null && !this.paginatorInitialized) {
            this.paginator = paginator;
            this.displayDataChanges.add(this.paginator.page);
            this.paginatorInitialized = true;
            this.filterChange.next(this.filter);
        }
    };
    TableDataSource.prototype.connect = function () {
        var _this = this;
        var page = this.paginator == null ? null : this.paginator.page;
        if (this.paginator != null)
            this.setPaginator(this.paginator);
        return Observable_1.Observable.merge.apply(Observable_1.Observable, this.displayDataChanges).map(function () {
            var data = _this.database.data;
            data = data.slice().filter(function (item) {
                var searchStr = "";
                for (var _i = 0, _a = _this.columns; _i < _a.length; _i++) {
                    var column = _a[_i];
                    if (item[column] != undefined) {
                        var sValue = item[column].toString();
                        searchStr += sValue.toLowerCase();
                    }
                }
                return searchStr.indexOf(_this.filter.toLowerCase()) != -1;
            });
            if (_this.paginator != null) {
                var startIndex = _this.paginator.pageIndex * _this.paginator.pageSize;
                data = data.splice(startIndex, _this.paginator.pageSize);
            }
            _this.renderedData = _this.getSortedData(data);
            return _this.renderedData;
        });
    };
    TableDataSource.prototype.disconnect = function () { };
    TableDataSource.prototype.getSortedData = function (data) {
        var _this = this;
        if (!this.sort.active || this.sort.direction == '') {
            return data;
        }
        return data.sort(function (a, b) {
            var propertyA = '';
            var propertyB = '';
            _a = [a[_this.sort.active], b[_this.sort.active]], propertyA = _a[0], propertyB = _a[1];
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this.sort.direction == 'asc' ? 1 : -1);
            var _a;
        });
    };
    return TableDataSource;
}(table_1.DataSource));
exports.TableDataSource = TableDataSource;
//# sourceMappingURL=easy-table-data-source.js.map