import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-select-close-reason',
  templateUrl: './select-close-reason.component.html',
  styleUrls: ['./select-close-reason.component.css']
})
export class SelectCloseReasonComponent implements OnInit {
  isOther: boolean = false;
  //indicator if the user confirm dialog 
  isConfirmed:boolean=false;
  description: string = '';
  choose: string = '';
  constructor(

    public dialogRef2: MatDialogRef<SelectCloseReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient

  ) { }

  ngOnInit() {
    
  }
  openOther() {
    this.isOther = true;
  }
  closeOther() {
    this.isOther = false;
  }
  confirm() {

    if (this.choose === 'other' && this.description === '') {

      return;
    }
   
    if (this.choose === '') {
      this.dialogRef2.close();
      return;
    }
    this.isConfirmed=true;
    if (this.choose != 'other') {
      this.description = this.choose;
    }
   
    this.dialogRef2.close();

  }



  close() {

    this.dialogRef2.close();

  }
}
