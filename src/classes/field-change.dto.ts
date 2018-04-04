export class FieldChangeDto {
    constructor(public key: string, public value: any = "", public valid: boolean, public selectedItem: any = "") { }
}
