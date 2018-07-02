import { comment } from './../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommentService {

  rootUrl = "";
  constructor(private http:HttpClient) { 
    this.rootUrl = "http://localhost:8081/aml/api/";
  }

  getSuspectComments(suspectId)
  {
    let url = this.rootUrl + "suspect/comments/"+suspectId;
    return this.http.get<comment[]>(url);
  }
}
