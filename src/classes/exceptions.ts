export class FieldWithSameKeyAlreadyExistsException {
    constructor(private message: string) { }

    toString() {
        return "FieldWithSameKeyAlreadyExistsException " + this.message;
    }
}

export class FieldWithKeyDoesNotExistException {
    constructor(private message: string) { }

    toString() {
        return "FieldWithKeyDoesNotExistException " + this.message;
    }
}

export class MultipleFieldsWithSameKeyExistException {
    constructor(private message: string) { }

    toString() {
        return "MultipleFieldsWithSameKeyExistException " + this.message;
    }
}
