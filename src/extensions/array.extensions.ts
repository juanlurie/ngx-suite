declare global {
    export interface Array<T> {
        single(): T;
        single(func: (value: T) => void): T;
        singleOrDefault(): T;
        singleOrDefault(func: (value: T) => void): T;
        first(func: (value: T) => void): T;
        first(): T;
        firstOrDefault(func: (value: T) => void): T;
        firstOrDefault(): T;
        last(func: (value: T) => void): T;
        last(): T;
        lastOrDefault(func: (value: T) => void): T;
        lastOrDefault(): T;
        where(func: (value: T) => void): T[];
        any(func: (value: T) => void): boolean;
        any(): boolean;
        all(func: (value: T) => void): boolean;
        orderBy(propertyExpression: (item: T) => any): T[];
        orderByDescending(propertyExpression: (item: T) => any): T[];
        add(item: T): void;
        addRange(items: T[]): void;
        remove(item: T): boolean;
    }
}

if (!Array.prototype.add) {
    Array.prototype.add = function <T>(item: T): void {
        this.push(item);
    }
}

if (!Array.prototype.addRange) {
    Array.prototype.addRange = function <T>(items: T[]): void {
        items.forEach(x => this.push(x));
    }
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function <T>(item: T): boolean {

        var index: number = this.indexOf(item);

        this.splice(index, 0);

        return index != -1;
    }
}

if (!Array.prototype.where) {
    Array.prototype.where = function <T>(func: (value: T) => void): T[] {
        let items = <Array<T>>this.filter(func);

        return items;
    }
}

if (!Array.prototype.orderBy) {

    Array.prototype.orderBy = function <T>(propertyExpression: (item: any) => any): T[] {
        let result = Array<T>();
        var compareFunction = (item1: any, item2: any): number => {
            if (propertyExpression(item1) > propertyExpression(item2)) return 1;
            if (propertyExpression(item2) > propertyExpression(item1)) return -1;
            return 0;
        }
        for (var i = 0; i < (<Array<any>>this).length; i++) {
            return (<Array<any>>this).sort(compareFunction);

        }
        return result;
    }
}

if (!Array.prototype.orderByDescending) {

    Array.prototype.orderByDescending = function <T>(propertyExpression: (item: any) => any): T[] {
        let result = Array<T>();
        var compareFunction = (item1: any, item2: any): number => {
            if (propertyExpression(item1) > propertyExpression(item2)) return -1;
            if (propertyExpression(item2) > propertyExpression(item1)) return 1;
            return 0;
        }
        for (var i = 0; i < (<Array<any>>this).length; i++) {
            return (<Array<any>>this).sort(compareFunction);

        }
        return result;
    }
}

if (!Array.prototype.single) {
    Array.prototype.single = function <T>(func: (value: T) => void = null): T {
        let items = this;

        if (func != null)
            items = <Array<T>>this.filter(func);

        if (items.length > 1)
            throw new SequenceContainsMoreThanOneElementException();

        if (items.length == 0)
            throw new SequenceDoesNotContainException();

        return items[0];
    }
}

if (!Array.prototype.singleOrDefault) {
    Array.prototype.singleOrDefault = function <T>(func: (value: T) => void = null): T {
        let items = this;

        if (func != null)
            items = <Array<T>>this.filter(func);

        if (items.length > 1)
            throw new SequenceContainsMoreThanOneElementException();

        if (items.length == 0)
            return null;

        return items[0];
    }
}

if (!Array.prototype.first) {
    Array.prototype.first = function <T>(func: (value: T) => void = null): T {

        let items = this;

        if (func != null)
            items = <Array<T>>this.filter(func);

        if (items.any())
            return items[0];
        else
            throw new SequenceDoesNotContainException();
    }
}

if (!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function <T>(func: (value: T) => void = null): T {
        let items = this;

        if (func != null)
            items = <Array<T>>this.filter(func);

        if (items.length > 0)
            return items[0];
        else
            return null;
    }
}

if (!Array.prototype.last) {
    Array.prototype.last = function <T>(func: (value: T) => void = null): T {

        let items = this.reverse();

        if (func != null)
            items = <Array<T>>this.filter(func);
        items = <Array<T>>this.filter(func);

        if (items.length > 1)
            return items[0];
        else
            throw new SequenceDoesNotContainException();
    }
}

if (!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function <T>(func: (value: T) => void = null): T {
        let items = this.reverse();

        if (func != null)
            items = <Array<T>>this.filter(func);

        if (items.length > 0)
            return items[0];
        else
            return null;
    }
}

if (!Array.prototype.any) {
    Array.prototype.any = function <T>(func: (value: T) => void = null): boolean {
        let items = this;

        if (func != null)
            items = <Array<T>>this.filter(func);

        return items.length > 0;
    }
}

if (!Array.prototype.all) {
    Array.prototype.all = function <T>(func: (value: T) => void): boolean {
        let items = <Array<T>>this.filter(func);

        return items.length == this.length;
    }
}

class SequenceDoesNotContainException extends Error {
    constructor() {
        super();

        Object.setPrototypeOf(this, SequenceDoesNotContainException.prototype);
    }
}

class SequenceContainsMoreThanOneElementException extends Error {
    constructor() {
        super();

        Object.setPrototypeOf(this, SequenceContainsMoreThanOneElementException.prototype);
    }
}

export class ArrayExtensions {

}