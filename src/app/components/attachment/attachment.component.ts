import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttachmentService } from '../../services/attachment.service';
import {saveAs } from "file-saver";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.css']
})
export class AttachmentComponent implements OnInit {
  f: FileList;
  // @ViewChild('ff') el: ElementRef;
  @ViewChild('files') el2: ElementRef;
  attachments:any=null;
  description:string=''
  key:number
  code:string
  constructor(private attachmentService: AttachmentService,private route:ActivatedRoute) { }
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.key = +params.get('obj_key');
      this.code = params.get('obj_level_code');

      this.attachmentService.getAttachments(this.key,this.code).subscribe(data=>{
 
        this.attachments=data
      })
    });


  }

  uploadAll() {
    let userId=+localStorage.getItem('id')
    this.attachmentService.uploadFiles(this.el2.nativeElement.files,this.key,this.code,this.description,userId).subscribe();
    // this.attachmentService.uploadFiles(this.el.nativeElement.files,this.key,this.code,this.description,userId).subscribe();


  }
  removeAll() {
    // this.el.nativeElement.value = ''
    this.el2.nativeElement.value = ''


  }
  deleteAttachment(id){
if(confirm("Are you sure you want to delete?"))
{
this.attachmentService.deleteAttachment(id).subscribe(

  data=>{
    this.attachmentService.getAttachments(this.key,this.code).subscribe(data=>{
      this.attachments=data
    })
  }
);}
  }
  downloadFile(fileName)
  {
    console.log(fileName)
    this.attachmentService.downloadFile(fileName).subscribe(data => {
      console.log(data)
      saveAs(data, fileName)}
    );
  }


}