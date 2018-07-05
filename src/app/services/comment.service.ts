import { comment } from './../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {

  rootUrl = "";
  constructor(private http:HttpClient) { 
    this.rootUrl = "http://localhost:8081/aml/api/v1/";
  }

  getSuspectComments(alarmed_Obj_Key,alarmed_Obj_level_Cd)
  {
    console.log(alarmed_Obj_level_Cd)
    console.log(alarmed_Obj_Key)

    let url = this.rootUrl + "comments?alarmed_Obj_level_Cd="+alarmed_Obj_level_Cd+"&alarmed_Obj_Key="+alarmed_Obj_Key;
    return this.http.get<comment[]>(url);
  }

  addComment(alarmed_Obj_Key,alarmed_Obj_level_Cd,description,uplodedById){
    const comment_: comment = {
      alarmed_Obj_Key:alarmed_Obj_Key,
      alarmed_Obj_level_Cd:alarmed_Obj_level_Cd,
      description:description,
      uplodedById:uplodedById
    }

    let url = this.rootUrl + "addcomment";

    return this.http.post(url,
      comment_
    ).subscribe(data => {},
      err => {
        console.log("Error occured");
      })
  }

  deleteComment(id_){
    let url = this.rootUrl + "deletecomment/"+id_;
    return this.http.delete(url, { responseType: "text" });
  }

  updateComment(comm_,f:FileList){
    let url = this.rootUrl + "updatecomment";

    let files: FileList = f;
    const formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append("updatedFiles", files[i]);
    }
    formData.append("newUpdatedComment", comm_);
    
    return this.http.post(url, formData).subscribe(data => {},
      err => {
        console.log("Error occured");
      });
  }

  deleteSpecificFile(file_id_,user_id){
    let url = this.rootUrl + "deletefile?fileId="+file_id_+"&userid="+user_id;
    return this.http.delete(url, { responseType: "text" });
  }

}
