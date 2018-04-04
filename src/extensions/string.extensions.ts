declare global {
    export interface String {
        fromCamelCase(): string;
    }
}

if (!String.prototype.fromCamelCase) {
    String.prototype.fromCamelCase = function (): string {
        return this.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    }
}

export class StringExtensions {

}