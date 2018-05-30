import { DataSource } from '@angular/cdk/table';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort, Sort, MatPaginator } from '@angular/material';

export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] { return this.dataChange.value; }

    constructor(data: any[]) {
        this.dataChange.next(data);
    }
}

export class TableDataSource extends DataSource<Array<any>> {

    filterChange = new BehaviorSubject('');
    get filter(): string { return this.filterChange.value; }
    set filter(filter: string) { this.filterChange.next(filter); }
    paginatorInitialized: boolean = false;
    renderedData: Array<any> = [];

    displayDataChanges: any = [
        this.database.dataChange,
        this.sort.sortChange,
        this.filterChange
    ];

    constructor(private database: TableDatabase, private sort: MatSort, private columns: string[], private paginator: MatPaginator) {
        super();
    }

    setPaginator(paginator: MatPaginator) {
        if (paginator != null && !this.paginatorInitialized) {
            this.paginator = paginator;
            this.displayDataChanges.add(this.paginator.page);
            this.paginatorInitialized = true;
            this.filterChange.next(this.filter);
        }
    }

    connect(): Observable<Array<any>> {

        let page = this.paginator == null ? null : this.paginator.page;

        if (this.paginator != null)
            this.setPaginator(this.paginator);

        return merge(...this.displayDataChanges).pipe(map(() => {

            let data = this.database.data;

            data = data.slice().filter((item: any) => {
                let searchStr = "";
                for (let column of this.columns) {
                    if (item[column] != undefined) {
                        let sValue = item[column].toString();
                        searchStr += sValue.toLowerCase();
                    }
                }
                return searchStr.indexOf(this.filter.toLowerCase()) != -1;
            });

            if (this.paginator != null) {
                const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
                data = data.splice(startIndex, this.paginator.pageSize);
            }

            this.renderedData = this.getSortedData(data);

            return this.renderedData;
        }));
    }

    disconnect() { }

    getSortedData(data: Array<any>): any[] {
        if (!this.sort.active || this.sort.direction == '') { return data; }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            [propertyA, propertyB] = [a[this.sort.active], b[this.sort.active]];

            let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this.sort.direction == 'asc' ? 1 : -1);
        });
    }
}