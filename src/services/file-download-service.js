"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var notification_service_1 = require("../notificationService/notification.service");
var file_saver_1 = require("file-saver");
var FileDownloadService = (function () {
    function FileDownloadService(http, easyNotification) {
        this.http = http;
        this.easyNotification = easyNotification;
    }
    FileDownloadService.prototype.downloadFile = function (url, overriddenFilename) {
        var _this = this;
        this.http.get(url, { responseType: http_1.ResponseContentType.Blob }).subscribe(function (x) {
            _this.saveToFileSystem(x, overriddenFilename);
        });
    };
    FileDownloadService.prototype.downloadFileFromBytes = function (bytes, filename) {
        file_saver_1.saveAs(new Blob([new Uint8Array(bytes)]), filename);
    };
    FileDownloadService.prototype.saveToFileSystem = function (response, overriddenFilename) {
        var contentDispositionHeader = response.headers.get('Content-Disposition');
        var contentType = response.headers.get('Content-Type');
        if (contentDispositionHeader == null || contentDispositionHeader == "" || contentType == null || contentType == "") {
            this.buildError();
            return;
        }
        var parts = contentDispositionHeader.split(';');
        var filename = parts[1].split('=')[1];
        var blob = new Blob([response._body], { type: contentType });
        file_saver_1.saveAs(blob, overriddenFilename != null && overriddenFilename != "" ? overriddenFilename : filename);
    };
    FileDownloadService.prototype.buildError = function () {
        var error = "There seems to be a problem with the server configuration. Please see example below:\n\n        If downloading from record store change url to RecordDownload.\n                \n        var result = new HttpResponseMessage(HttpStatusCode.OK);\n        result.Content = new ByteArrayContent(record.FileData);\n\n        result.Content.Headers.ContentType = new MediaTypeHeaderValue(\"application/pdf\");\n        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue(\"attachment\");\n        result.Content.Headers.ContentDisposition.FileName = record.FileName;\n\n        result.Content.Headers.Add(\"Access-Control-Expose-Headers\", \"Content-Disposition\");\n        result.Content.Headers.Add(\"Access-Control-Expose-Headers\", \"Filename\");\n        result.Content.Headers.Add(\"Filename\", record.FileName);";
        this.easyNotification.showError("Download failed", "Could not download file. Check console for errors.");
        console.error(error);
    };
    return FileDownloadService;
}());
FileDownloadService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, notification_service_1.EasyNotification])
], FileDownloadService);
exports.FileDownloadService = FileDownloadService;
//# sourceMappingURL=file-download-service.js.map