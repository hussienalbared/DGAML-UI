import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType, RequestOptions } from '@angular/http';

@Injectable()
export class AttachmentService {

  constructor(private http: HttpClient) { }
  getAttachments(key, code) {
    let url = `http://localhost:8081/aml/api/Attachment/bySuspect?code=${code}&key=${key}`;
    console.log(url)
    return this.http.get(url);
  }
  uploadFiles(f: FileList, alarmed_Obj_Key, alarmed_Obj_level_Cd, description, uplodedById) {
    let files: FileList = f;
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("alarmed_Obj_Key", alarmed_Obj_Key);
    formData.append("alarmed_Obj_level_Cd", alarmed_Obj_level_Cd);
    formData.append("description", description);
    formData.append("uplodedById", uplodedById);

    let url = "http://localhost:8081/aml/api/Attachment/uploadMultipleFiles"
    return this.http.post(url, formData)

  }
  deleteAttachment(id) {
    let url = `http://localhost:8081/aml/api/Attachment/delete/${id}`
    console.log(url)
    return this.http.delete(url, { responseType: "text" });

  }
  uploadFile(f: File, alarmed_Obj_Key, alarmed_Obj_level_Cd, description, uplodedById) {
    const formData = new FormData();


    formData.append("files", f);

    formData.append("alarmed_Obj_Key", alarmed_Obj_Key);
    formData.append("alarmed_Obj_level_Cd", alarmed_Obj_level_Cd);
    formData.append("description", description);
    formData.append("uplodedById", uplodedById);

    let url = "http://localhost:8081/aml/api/Attachment/uploadFile"
    return this.http.post(url, formData)

  }
  downloadFile(filename) {
    let url = `http://localhost:8081/aml/api/Attachment/downloadFile/${filename}`
    console.log(url)
    return this.http.get(url, { responseType: 'blob' })
  }



}

