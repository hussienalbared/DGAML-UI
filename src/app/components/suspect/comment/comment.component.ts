import { saveAs } from 'file-saver';
import { user } from './../../../models/user.model';
import { UserService } from './../../../services/user.service';
import { WebSocketServiceService } from './../../../web-socket-service.service';
import { ActivatedRoute } from '@angular/router';
import { comment } from './../../../models/comment.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  f: FileList;
  @ViewChild('files2') el2: ElementRef;
  @ViewChild('filesUpdated') el3: ElementRef;
  attachments:any=null;

  suspectId:Number;
  suspectName:string='Amr';
  
  comments_block:comment[]=[];

  alarmed_Obj_Key:string;
  alarmed_Obj_level_Cd: string;
  addedComment: comment;
  uploadedUser: user;
  loggedInuser=localStorage.getItem('id');

  returnedComment:comment[]=[];

  constructor(private route: ActivatedRoute,private commentService:CommentService,
    private webSocketService: WebSocketServiceService,private userService:UserService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.alarmed_Obj_Key=params.get('obj_key');
      this.alarmed_Obj_level_Cd = params.get('obj_level_code');
    });

    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

    stompClient.subscribe(`/topic/comment/${this.alarmed_Obj_Key}/${this.alarmed_Obj_level_Cd}`, comment => {
      this.returnedComment= JSON.parse(comment.body);

      console.log("stompClient.subscribe: ")
      console.log(this.returnedComment)

      // console.log("addedComment: ")
      // console.log(this.addedComment)

      // this.comments_block.push(this.addedComment)

      this.comments_block = this.returnedComment;
   })

     //..
    //  this.commentService.getAttachments(this.alarmed_Obj_Key,this.alarmed_Obj_level_Cd).subscribe(data=>{
    //   console.log(data)
    //   this.attachments=data
    // })
    
  });

    this.commentService.getComments(this.alarmed_Obj_Key,this.alarmed_Obj_level_Cd).subscribe(data=>{
      this.comments_block = data;
      console.log("log returend comments")
      console.log(this.comments_block)
    });
    this.userService.getUser(this.loggedInuser).subscribe(data=>{
      this.uploadedUser=data;
    });
  }

  addComment(form_){
    console.log("log add comment -----------")
    console.log(form_)

    if(form_.desc.length === 0 && this.el2.nativeElement.files['length']===0){
      // show msg
      console.log("cannot add empty comment")
    }
    else {
      console.log("Log Add Comment Function")
      // this.commentService.addComment(this.alarmed_Obj_Key,this.alarmed_Obj_level_Cd,form_.desc,this.loggedInuser);
      this.commentService.uploadFiles(this.el2.nativeElement.files,this.alarmed_Obj_Key,this.alarmed_Obj_level_Cd,
        form_.desc,this.loggedInuser).subscribe(
        data=>{
          this.attachments=data;
        }
        
          );
      }
  }

  downloadFile(fileName)
  {
    console.log(fileName)
    this.commentService.downloadFile(fileName).subscribe(data => {
      console.log(data)
      saveAs(data, fileName)}
    );
  }

  deleteComment(id_){
    console.log("log deleteComment")
    console.log(id_);
    if(confirm("Are you sure you want to delete?"))[
      this.commentService.deleteComment(id_,this.loggedInuser,this.alarmed_Obj_Key,this.alarmed_Obj_level_Cd)
    ]
  }

  // update_clicked = false;
  showUpdateComment(index){
    console.log("log updateComment");
    $('#U'+index).css('display','block');
    $('#C'+index).css('display','none');
    // this.update_clicked = true;
  }

  updateComment(form_,index,comObj:comment){
    $('#U'+index).css('display','none');
    $('#C'+index).css('display','block');

    console.log("log updateComment")
    console.log(form_.comment_desc)
    console.log(form_.MultipleFiles)

    const comm_ = {
      id:comObj.id,
      alarmed_Obj_Key:this.alarmed_Obj_Key,
      alarmed_Obj_level_Cd:this.alarmed_Obj_level_Cd,
      description: form_.comment_desc?form_.comment_desc:comObj.description,
      uplodedById: this.loggedInuser
    }
    
    
    console.log(form_.comment_desc.length)
    if(form_.comment_desc.length===0 && this.el3.nativeElement.files['length']>0)
    {
      console.log("add only files")
      this.commentService.addNewFilesToComment(this.el3.nativeElement.files,comObj['id'],this.loggedInuser,this.alarmed_Obj_level_Cd,this.alarmed_Obj_Key)
    }
    else if(form_.comment_desc.length==0&&this.el3.nativeElement.files['length']==0){
      //
    }
    else{
      console.log(comObj.id+"[[[[[[[[[[[[[[[")
     this.commentService.updateComment(this.el3.nativeElement.files,comm_);
    }
    

    console.log("commmmmm desc: ")
    console.log(form_.comment_desc)

    console.log("know files size selected:")
    console.log(this.el3.nativeElement.files.length)
    console.log(this.el3.nativeElement.files['length'])
    // if(this.el3.nativeElement.files['length'] == 0){

    // }
    // this.commentService.updateComment(comm_,this.el3.nativeElement.files);

    form_.form_.comment_desc = '';
    this.el3.nativeElement.value = '';
  }

  deleteSpecificFile(file_){
    this.commentService.deleteSpecificFile(file_.id,this.loggedInuser,this.alarmed_Obj_level_Cd,this.alarmed_Obj_Key);
  }

  closeUpdateComment(index){
    $('#U'+index).css('display','none');
    $('#C'+index).css('display','block');
  }

  /***/
  // hoverClass='comment-icons';
  //   hoverIn (t){
  //     console.log("log hover in")
  //     console.log(t.target.children[4].children[1])
  //     this.hoverClass = 'hovered-comment';
  //   };
  //   hoverOut(){
  //     this.hoverClass='comment-icons';
  //   };
  /***/

}
