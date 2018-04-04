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
if (!Array.prototype.add) {
    Array.prototype.add = function (item) {
        this.push(item);
    };
}
if (!Array.prototype.addRange) {
    Array.prototype.addRange = function (items) {
        var _this = this;
        items.forEach(function (x) { return _this.push(x); });
    };
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        this.splice(index, 0);
        return index != -1;
    };
}
if (!Array.prototype.where) {
    Array.prototype.where = function (func) {
        var items = this.filter(func);
        return items;
    };
}
if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (propertyExpression) {
        var result = Array();
        var compareFunction = function (item1, item2) {
            if (propertyExpression(item1) > propertyExpression(item2))
                return 1;
            if (propertyExpression(item2) > propertyExpression(item1))
                return -1;
            return 0;
        };
        for (var i = 0; i < this.length; i++) {
            return this.sort(compareFunction);
        }
        return result;
    };
}
if (!Array.prototype.orderByDescending) {
    Array.prototype.orderByDescending = function (propertyExpression) {
        var result = Array();
        var compareFunction = function (item1, item2) {
            if (propertyExpression(item1) > propertyExpression(item2))
                return -1;
            if (propertyExpression(item2) > propertyExpression(item1))
                return 1;
            return 0;
        };
        for (var i = 0; i < this.length; i++) {
            return this.sort(compareFunction);
        }
        return result;
    };
}
if (!Array.prototype.single) {
    Array.prototype.single = function (func) {
        if (func === void 0) { func = null; }
        var items = this;
        if (func != null)
            items = this.filter(func);
        if (items.length > 1)
            throw new SequenceContainsMoreThanOneElementException();
        if (items.length == 0)
            throw new SequenceDoesNotContainException();
        return items[0];
    };
}
if (!Array.prototype.singleOrDefault) {
    Array.prototype.singleOrDefault = function (func) {
        if (func === void 0) { func = null; }
        var items = this;
        if (func != null)
            items = this.filter(func);
        if (items.length > 1)
            throw new SequenceContainsMoreThanOneElementException();
        if (items.length == 0)
            return null;
        return items[0];
    };
}
if (!Array.prototype.first) {
    Array.prototype.first = function (func) {
        if (func === void 0) { func = null; }
        var items = this;
        if (func != null)
            items = this.filter(func);
        if (items.any())
            return items[0];
        else
            throw new SequenceDoesNotContainException();
    };
}
if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function (func) {
        if (func === void 0) { func = null; }
        var items = this;
        if (func != null)
            items = this.filter(func);
        if (items.length > 0)
            return items[0];
        else
            return null;
    };
}
if (!Array.prototype.last) {
    Array.prototype.last = function (func) {
        if (func === void 0) { func = null; }
        var items = this.reverse();
        if (func != null)
            items = this.filter(func);
        items = this.filter(func);
        if (items.length > 1)
            return items[0];
        else
            throw new SequenceDoesNotContainException();
    };
}
if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function (func) {
        if (func === void 0) { func = null; }
        var items = this.reverse();
        if (func != null)
            items = this.filter(func);
        if (items.length > 0)
            return items[0];
        else
            return null;
    };
}
if (!Array.prototype.any) {
    Array.prototype.any = function (func) {
        if (func === void 0) { func = null; }
        var items = this;
        if (func != null)
            items = this.filter(func);
        return items.length > 0;
    };
}
if (!Array.prototype.all) {
    Array.prototype.all = function (func) {
        var items = this.filter(func);
        return items.length == this.length;
    };
}
var SequenceDoesNotContainException = (function (_super) {
    __extends(SequenceDoesNotContainException, _super);
    function SequenceDoesNotContainException() {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, SequenceDoesNotContainException.prototype);
        return _this;
    }
    return SequenceDoesNotContainException;
}(Error));
var SequenceContainsMoreThanOneElementException = (function (_super) {
    __extends(SequenceContainsMoreThanOneElementException, _super);
    function SequenceContainsMoreThanOneElementException() {
        var _this = _super.call(this) || this;
        Object.setPrototypeOf(_this, SequenceContainsMoreThanOneElementException.prototype);
        return _this;
    }
    return SequenceContainsMoreThanOneElementException;
}(Error));
var ArrayExtensions = (function () {
    function ArrayExtensions() {
    }
    return ArrayExtensions;
}());
exports.ArrayExtensions = ArrayExtensions;
//# sourceMappingURL=array.extensions.js.map