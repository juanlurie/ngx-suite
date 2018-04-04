export class SelectOption<T> {
    public key: T;
    public value: string;

    constructor(key: T, value: string) {
        this.key = key;
        this.value = value;
    }
}
