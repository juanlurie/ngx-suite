import { Component, Input, OnInit, ElementRef, ViewChild, DoCheck, IterableDiffers, Output, EventEmitter, OnChanges } from '@angular/core';
import { FieldChangeDto, ColumnTypes } from '../classes/index';
import { EasyButtonField, EasyInputField } from '../factories/index';
import { EasyField } from '../baseClasses/easy-field';
import { DataSource } from '@angular/cdk/table';
import { fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { MatSort, Sort, MatSortable, MatPaginator, PageEvent } from '@angular/material';
import { TableDataSource, TableDatabase } from '../common/easy-table-data-source'

export class Sortable implements MatSortable {
  id: string;
  start: "asc" | "desc";
  disableClear: boolean;
}

@Component({
  selector: 'easy-table',
  template: `
    <div class="table-container mat-elevation-z8">
      <div style="overflow-x: auto">
        <div class="table-header" *ngIf="rows.length > 0 && showFilter">
          <mat-form-field floatPlaceholder="never">
            <input matInput #filter placeholder="Filter">
            <easy-button matSuffix color="" type="mat-icon-button" displayValue="" icon="clear" (onClicked)="clearFilter();"></easy-button>
          </mat-form-field>
        </div>

        <mat-table #table [dataSource]="dataSource" matSort>
      
          <div *ngFor="let column of columns">      
            <ng-container [cdkColumnDef]="column.key" >
              <mat-header-cell [style.min-width]="column.minWidth" [style.max-width]="column.maxWidth" [style.width]="column.width" [style.text-align]="column.textAlign" [style.margin-left]="column.marginLeft" [style.margin-right]="column.marginRight" *cdkHeaderCellDef mat-sort-header>{{column.label == 'Actions' ? '' : column.label }}</mat-header-cell>
              <mat-cell [style.min-width]="column.minWidth" [style.max-width]="column.maxWidth" [style.width]="column.width" [style.text-align]="column.textAlign" [style.margin-left]="column.marginLeft" [style.margin-right]="column.marginRight" *cdkCellDef="let row">
                <div [ngSwitch]="column.type">
                  <span *ngSwitchCase="'actions'" class="button-row">
                    <div *ngFor="let action of actions; let indexAction = index"> 
                      <easy-button [key]="action.key + indexRow + indexAction" [icon]="action.icon" [color]="action.color" [displayValue]="action.label" [type]="action.type" (onClicked)="click(action.action,row)"></easy-button>
                    </div>
                  </span>
                  <span *ngSwitchCase="'date'">
                    {{row[column.key] | date:column.format}}
                  </span>
                  
                  <span *ngSwitchDefault>
                    {{row[column.key]}}
                  </span>
                </div>                 
              </mat-cell>
            </ng-container>
          </div>
      
          <mat-header-row *cdkHeaderRowDef="displayColumns"></mat-header-row>
          <mat-row *cdkRowDef="let row; columns: displayColumns;" (click)="rowClicked(row)"></mat-row>
      
        </mat-table>
    
        <div class="no-results" [style.display]="dataSource == null || dataSource.renderedData.length == 0 ? '' : 'none'">
          No data to display
        </div>
      </div>
      <mat-paginator *ngIf="rows.length > 0 && showPaginator" #paginator [length]="totalItems" [pageIndex]="pageIndex" [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25, 100]" [style.visibility]="rows.length > 0" (page)="onPageChange($event)">
      </mat-paginator>
  </div>`,
  //<easy-form-field *ngSwitchCase="'control'" fxFlex="auto" [field]="getField(column,row)" (fieldValueChange)="valueChanged($event)"></easy-form-field>
  styles: [`
  .table-container {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    margin-bottom: 30px;
  }
  
  .table-header {
    min-height: 56px;
    max-height: 56px;
    display: flex;
    align-items: center;
    padding: 8px 24px 0;
    font-size: 20px;
    justify-content: space-between;
    border-bottom: 1px solid transparent;
  }
  
  mat-header-cell {
    margin-right: 10px;
  }
  
  mat-cell {
    margin-right: 10px;
  }
  
  mat-form-field {
    font-size: 14px;
    flex-grow: 1;
    margin-left: 32px;
    margin-top: 8px;
  }
  
  .no-results {
    display: flex;
    justify-content: center;
    padding: 24px;
    font-size: 12px;
    font-style: italic;
  }
  
  mat-table {
    overflow: auto;
    max-height: 500px;
  }
  
  mat-row {
    cursor: pointer;
  }
  
  mat-row:hover {
    background: lightgray;
  }
  
  .button-row {
    display: flex;
    align-items: right;
    justify-content: flex-end;
  }
`]
})

export class EasyTableComponent implements OnInit, DoCheck {

  @Input() columns: Array<EasyField>;
  @Input() rows: Array<any> = [];
  @Input() actions: Array<any> = [];
  @Input() showFilter: boolean = false;
  @Input() showPaginator: boolean = false;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 25;
  @Input() totalItems: number = 0;
  displayColumns: Array<string> = [];
  dataSource: TableDataSource | null;
  database: TableDatabase | null;
  colCounts: number = 0;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  iterableDiffer: any;
  @Output() fieldValueChange = new EventEmitter<FieldChangeDto>();
  @Output() pageChange = new EventEmitter<PageEvent>();

  constructor(private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit() {

    this.displayColumns.length = 0;
    this.totalItems = 0;
    this.pageIndex = 0;
    this.pageSize = 25;

    for (let column of this.columns.where(x => !x.hide && x.type != "hidden"))
      this.displayColumns.push(column.key);

    if (this.actions.length > 0 && !this.columns.any(x => x.key == "Actions")) {
      for (let item of this.rows)
        item["Actions"] = "Placeholder";
      this.displayColumns.push("Actions");
      this.columns.push(new EasyButtonField({ type: ColumnTypes.column_type_actions, key: "Actions", label: "Actions" }));
    }

    this.database = new TableDatabase(this.rows);
    if (this.totalItems === 0) {
      this.totalItems = this.database.data.length;
    }
  }

  ngDoCheck() {

    if (this.dataSource == null) {
      if (this.showFilter && this.showPaginator && this.filter != null && this.paginator != null) {
        this.dataSource = new TableDataSource(this.database, this.sort, this.displayColumns, this.paginator);
        this.initializeFilter();
      }
      else if (this.showFilter && this.filter != null) {
        this.dataSource = new TableDataSource(this.database, this.sort, this.displayColumns, this.paginator);
        this.initializeFilter();
      }
      else if (this.showPaginator && this.paginator != null) {
        this.dataSource = new TableDataSource(this.database, this.sort, this.displayColumns, this.paginator);
      }
      else if (!this.showFilter && !this.showPaginator) {
        this.dataSource = new TableDataSource(this.database, this.sort, this.displayColumns, this.paginator);
      }
      if (this.totalItems === 0) {
        this.totalItems = this.database.data.length;
      }
    }

    let changes = this.iterableDiffer.diff(this.rows);
    if (changes) {
      this.database.dataChange.next(this.rows);
    }
  }

  initializeFilter() {
    if (this.filter != null)
      fromEvent(this.filter.nativeElement, 'keyup')
        .pipe(
          debounceTime(150),
          distinctUntilChanged())
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

  sortData(sort: Sort) {
    this.sort.direction = sort.direction;
    this.sort.active = sort.active;
    let sortable = new Sortable();
    sortable.id = sort.active;
    sortable.start = sort.direction == 'asc' ? 'asc' : 'desc';
    this.sort.sort(sortable);
  }

  getField(column: EasyField, row: any): EasyField {
    let field = new EasyField(column.options);
    let value = Object.keys(row).single(x => x == column.key);
    field.value = row[value];
    field.label = "";
    field.marginLeft = column.marginLeft;
    field.marginTop = column.marginTop;
    field.marginRight = column.marginRight;
    field.marginBottom = column.marginBottom;

    field.onChange.subscribe(field => {
      let rowKey = Object.keys(row).single(x => x == field.key.split('|')[0]);
      row[rowKey] = field.value;
      this.fieldValueChange.emit(new FieldChangeDto("", this.rows, true));
    })

    if (field.type === 'control') {
      field.key = field.key + '|' + this.colCounts.toString();
      this.colCounts++;
    }

    return field;
  }

  clearFilter() {
    this.filter.nativeElement.value = "";

    if (!this.dataSource) {
      return;
    }

    this.dataSource.filter = this.filter.nativeElement.value;
  }

  click(action: Function, row: any) {
    var rowIndex = this.rows.indexOf(row);
    row.rowIndex = rowIndex;
    action(row);
  }

  rowClicked(row: any) {
    var rowIndex = this.rows.indexOf(row);
    row.rowIndex = rowIndex;
    if (this.actions.length > 0) {
      this.actions[0].action(row);
    }
  }

  getValue(column: EasyField, row: {}) {
    let name = column.key.split(' ').join('');
    return row[name];
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
