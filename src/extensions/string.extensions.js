"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!String.prototype.fromCamelCase) {
    String.prototype.fromCamelCase = function () {
        return this.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    };
}
var StringExtensions = (function () {
    function StringExtensions() {
    }
    return StringExtensions;
}());
exports.StringExtensions = StringExtensions;
//# sourceMappingURL=string.extensions.js.map