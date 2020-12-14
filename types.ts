/* eslint-disable camelcase */
interface IPrismicBlob {
  fileUrl: string;
  fileName: string;
  thumbnail: string;
}

export interface IPrismicResult {
  id: string;
  title: string;
  description: string;
  image_url: string;
  last_update: number;
  blob: IPrismicBlob;
}

export interface IPrismicResponse {
  results_size: number;
  results: IPrismicResult[];
}

export type FileType =
  | "Image"
  | "Video"
  | "PDF"
  | "Word Document"
  | "Spreadsheet"
  | "PowerPoint"
  | "File";

export type ContentType =
  | "image/png"
  | "image/jpeg"
  | "video/mp4"
  | "video/quicktime"
  | "video/x-ms-asf"
  | "video/x-flv"
  | "video/x-msvideo"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "text/csv"
  | "text";

export type S3UploadFolder =
  | "images"
  | "videos"
  | "pdfs"
  | "docs"
  | "spreadsheets"
  | "powerpoints"
  | "other-files";

export interface FileInfo {
  type: FileType;
  contentType: ContentType;
  s3UploadFolder: S3UploadFolder;
}

export interface AWSFileUpload {
  uploadPath: string;
  fileBuffer: Buffer;
  contentType: ContentType;
}

export interface DropboxSearchPagination {
  page: number;
  resultsLimit: number;
}
