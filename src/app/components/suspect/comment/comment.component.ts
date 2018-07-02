import { ActivatedRoute } from '@angular/router';
import { comment } from './../../../models/comment.model';
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  suspectId:Number;
  suspectName:string='Amr';
  comments_block:comment[]=[
    {suspectId:1,userId:1,messege:"At org.springframework.beans.factory.support.at org.springframework.beans.factory.support.at org.springframework.beans.factory.support.at org.springframework.beans.factory.support."},
    {suspectId:1,userId:2,messege:"At org.springframework.beans.factory.support.at org.springframework.beans.factory.support.at org.springframework.beans.factory.support.at org.springframework.beans.factory.support."},
  ]; //store all comments of specific suspect

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.suspectId=params.get(''); //get id of the suspect
    // }
    // this.commentservice.getSuspectComments(this.suspectId)
  }

  addComment(){
    console.log("Log Add Comment Function")
  }

}
