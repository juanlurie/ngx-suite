import { Component, Input, OnInit } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { EasyNotification } from '../notificationService/notification.service';
import { FileDownloadService } from '../services/file-download-service';

export class SourceDetail {

    url: string;
    httpHeaders: Object
    withCredentials: boolean

    constructor(url: string, token: string) {
        this.url = url;
        this.httpHeaders = { Authorization: token }
    }
}

@Component({
    selector: 'easy-record',
    template: `<div>
                <div *ngIf="!isLoadComplete">
                    <mat-progress-bar mode="indeterminate">
                    </mat-progress-bar>
                </div>
                <mat-toolbar>
                    <easy-button icon="keyboard_arrow_left" matTooltip="Previous Page" type="mat-icon-button" displayValue="''" (onClicked)="previousPage()"></easy-button>
                    <easy-button icon="keyboard_arrow_right" matTooltip="Next Page" type="mat-icon-button" displayValue="''" (onClicked)="nextPage()"></easy-button>
                    <span class="spacer"></span>
                    <easy-button icon="file_download" matTooltip="Download" type="mat-icon-button" displayValue="''" (onClicked)="download()"></easy-button>
                </mat-toolbar>
                <div [style.visible]="isLoadComplete">               
                    <pdf-viewer [src]="document" [(page)]="page" [show-all]="false" original-size="false"
                        (after-load-complete)="loadComplete($event)" (error)="onError($event)"></pdf-viewer>                
                    </div>
                <div>`,
    styles: [`.spacer { flex: 1 1 auto; }
            `]
})
export class EasyRecordComponent implements OnInit {
    @Input('source') source: string;
    @Input('authorizationHeader') authorizationHeader: string;

    document: SourceDetail;

    pageCount: number;
    page: number = 1;
    isLoadComplete: boolean = false;

    constructor(private easyNotification: EasyNotification, private fileDownloader: FileDownloadService, private http: Http) {

    }

    ngOnInit() {

        this.document = new SourceDetail(this.source, this.authorizationHeader);
    }

    loadComplete(event: any) {
        this.isLoadComplete = true;
        this.pageCount = event.numPages;
    }

    onError(error: any) {
        this.easyNotification.showError("Error", "Could open load pdf");
    }

    nextPage() {
        this.page++;
    }

    previousPage() {
        if (this.page > 1)
            this.page--;
    }

    getFilename(response: any): string {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const contentType: string = response.headers.get('Content-Type');

        if (contentDispositionHeader == null || contentDispositionHeader == "") {

            if (contentType != null && contentType != "") {
                return "download" + "." + this.getFileExtension(contentType);
            }
            return "";
        }

        const parts: string[] = contentDispositionHeader.split(';');
        return parts[1].split('=')[1];
    }

    download() {

        this.http.get(this.source, { responseType: ResponseContentType.ArrayBuffer })
            .subscribe((file: any) => {
                let bytes = new Uint8Array(file._body);
                this.fileDownloader.downloadFileFromBytes(bytes, this.getFilename(file));
            }, x => {
                this.easyNotification.showError("Error", "Could open load pdf");
            })
    }

    getFileExtension(filename: string) {
        return filename.split('/').pop();
    }
}