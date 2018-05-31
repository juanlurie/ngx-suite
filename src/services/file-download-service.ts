import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { EasyNotification } from '../notificationService/notification.service'
import { saveAs } from 'file-saver';

@Injectable()
export class FileDownloadService {
    constructor(private http: HttpClient, private easyNotification: EasyNotification) {

    }

    public downloadFile(url: string, overriddenFilename?: string) {
        this.http.get(url, { responseType: 'blob' }).subscribe(x => {
            this.saveToFileSystem(x, overriddenFilename);
        })
    }

    public downloadFileFromBytes(bytes: Uint8Array, filename: string) {
        saveAs(new Blob([new Uint8Array(bytes)]), filename);
    }

    private saveToFileSystem(response: any, overriddenFilename?: string) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const contentType: string = response.headers.get('Content-Type');

        if (contentDispositionHeader == null || contentDispositionHeader == "" || contentType == null || contentType == "") {
            this.buildError();
            return;
        }

        const parts: string[] = contentDispositionHeader.split(';');
        const filename = parts[1].split('=')[1];

        const blob = new Blob([response._body], { type: contentType });
        saveAs(blob, overriddenFilename != null && overriddenFilename != "" ? overriddenFilename : filename);
    }

    private buildError() {
        var error = `There seems to be a problem with the server configuration. Please see example below:

        If downloading from record store change url to RecordDownload.
                
        var result = new HttpResponseMessage(HttpStatusCode.OK);
        result.Content = new ByteArrayContent(record.FileData);

        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        result.Content.Headers.ContentDisposition.FileName = record.FileName;

        result.Content.Headers.Add("Access-Control-Expose-Headers", "Content-Disposition");
        result.Content.Headers.Add("Access-Control-Expose-Headers", "Filename");
        result.Content.Headers.Add("Filename", record.FileName);`;

        this.easyNotification.showError("Download failed", "Could not download file. Check console for errors.")

        console.error(error);
    }
}