import { comment } from './../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {

  rootUrl = "";
  constructor(private http:HttpClient) { 
    this.rootUrl = "http://localhost:8081/aml/api/";
  }

  getComments(alarmed_Obj_Key,alarmed_Obj_level_Cd)
  {
    console.log(alarmed_Obj_level_Cd)
    console.log(alarmed_Obj_Key)

    let url = this.rootUrl + "comments/comments?alarmed_Obj_level_Cd="+alarmed_Obj_level_Cd+"&alarmed_Obj_Key="+alarmed_Obj_Key;
    return this.http.get<comment[]>(url);
  }

  // addComment(alarmed_Obj_Key,alarmed_Obj_level_Cd,description,uplodedById){
  //   const comment_ = {
  //     alarmed_Obj_Key:alarmed_Obj_Key,
  //     alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
  //     description:description,
  //     uplodedById:uplodedById
  //   }

  //   let url = this.rootUrl + "addcomment";

  //   return this.http.post(url,
  //     comment_
  //   ).subscribe(data => {},
  //     err => {
  //       console.log("Error occured");
  //     })
  // }

  deleteComment(id_,userId,alarmed_Obj_Key,alarmed_Obj_level_Cd){
    let url = this.rootUrl+"comments/deleteComment?commentId="+id_+"&updaterId="+userId+"&alarmed_Obj_Key="+alarmed_Obj_Key+"&alarmed_Obj_level_Cd="+alarmed_Obj_level_Cd;
    return this.http.delete(url).subscribe(data=>{});
  }

  deleteSpecificFile(file_id_,user_id,alarmed_Obj_Key,alarmed_Obj_level_Cd){
    console.log("log delete specif file servcie")
    let url = this.rootUrl + "Attachment/removeAttachment?attachmentid="+file_id_+"&userId="+user_id+"&alarmed_Obj_level_Cd="+alarmed_Obj_level_Cd+"&alarmed_Obj_Key="+alarmed_Obj_Key;
    return this.http.delete(url).subscribe(data=>{});
  }

  /**********************************************************/
  getAttachments(key, code) {
    let url = this.rootUrl+ `comments/comments?code=${code}&key=${key}`;
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

    let url = this.rootUrl + "Attachment/uploadMultipleFiles"
    return this.http.post(url, formData)

  }
  deleteAttachment(id) {
    let url = `http://localhost:8081/aml/api/Attachment/delete/${id}`
    console.log(url)
    return this.http.delete(url, { responseType: "text" });

  }

  addNewFilesToComment(f: FileList,commentid,userid,alarmed_Obj_level_Cd,alarmed_Obj_Key){
    let files: FileList = f;
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("commentId", commentid);
    formData.append("userId", userid);

    formData.append("alarmed_Obj_level_Cd", alarmed_Obj_level_Cd);
    formData.append("alarmed_Obj_Key", alarmed_Obj_Key);

    let url = this.rootUrl+ "Attachment/addNewFilesToComment"
    return this.http.post(url, formData).subscribe(data=>{})
  }

  updateComment(f: FileList,comment_:comment){
    let files: FileList = f;
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("commentid",String(comment_.id));
    formData.append("description",comment_.description);
    formData.append("uplodedById",comment_.uplodedById);
    formData.append("alarmed_Obj_level_Cd",comment_.alarmed_Obj_level_Cd);
    formData.append("alarmed_Obj_Key",comment_.alarmed_Obj_Key);

    let url = this.rootUrl+ "comments/updateComment";
  
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    return this.http.post(url,formData).subscribe(data=>{})
  }

  downloadFile(filename) {
    let url = this.rootUrl+ `Attachment/downloadFile/${filename}`
    console.log(url)
    return this.http.get(url, { responseType: 'blob' })
  }
  /**********************************************************/

}
