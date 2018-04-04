"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldWithSameKeyAlreadyExistsException = (function () {
    function FieldWithSameKeyAlreadyExistsException(message) {
        this.message = message;
    }
    FieldWithSameKeyAlreadyExistsException.prototype.toString = function () {
        return "FieldWithSameKeyAlreadyExistsException " + this.message;
    };
    return FieldWithSameKeyAlreadyExistsException;
}());
exports.FieldWithSameKeyAlreadyExistsException = FieldWithSameKeyAlreadyExistsException;
var FieldWithKeyDoesNotExistException = (function () {
    function FieldWithKeyDoesNotExistException(message) {
        this.message = message;
    }
    FieldWithKeyDoesNotExistException.prototype.toString = function () {
        return "FieldWithKeyDoesNotExistException " + this.message;
    };
    return FieldWithKeyDoesNotExistException;
}());
exports.FieldWithKeyDoesNotExistException = FieldWithKeyDoesNotExistException;
var MultipleFieldsWithSameKeyExistException = (function () {
    function MultipleFieldsWithSameKeyExistException(message) {
        this.message = message;
    }
    MultipleFieldsWithSameKeyExistException.prototype.toString = function () {
        return "MultipleFieldsWithSameKeyExistException " + this.message;
    };
    return MultipleFieldsWithSameKeyExistException;
}());
exports.MultipleFieldsWithSameKeyExistException = MultipleFieldsWithSameKeyExistException;
//# sourceMappingURL=exceptions.js.map