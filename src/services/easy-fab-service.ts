import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { FieldOptions } from '../classes/index'
import { EasyField } from '../baseClasses/easy-field';

@Injectable()
export class EasyFabService {

    private subject = new Subject<boolean>();
    public actions: Array<EasyField> = []
    initialized = this.subject.asObservable();

    constructor() { }

    initialize(actions: Array<EasyField> = []) {
        this.actions = actions;
        this.subject.next(true);
    }

    uninitialize() {
        this.actions = [];
        this.subject.next(true);
    }
}