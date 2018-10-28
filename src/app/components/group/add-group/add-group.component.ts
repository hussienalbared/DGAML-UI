import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GroupService } from '../../../services/group.service';

import { environment } from '../../../../environments/environment'; @Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private groupService: GroupService,
    public translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  GroupsNames: any = [];

  name_ = '';

  ngOnInit() {

    this.groupService.getAllGroups().subscribe(data => {
      this.GroupsNames = data;
    })
  }
  addgroup(addForm) {
    if(addForm.name.length == 0)
      this.toastr.error('Cannot add group without name.','Error!');

    else {
      if(this.GroupsNames.find(e => e.name === 'ROLE_'+addForm.name)){
        this.toastr.error('Cannot have more than one group with same name.','Error!');
      }else{
        let url = environment.projectName + "/aml/api/group/add";
        let group = {
          name: "ROLE_" + addForm.name
        }
        this.http.post(url, group).subscribe(res => {

          if(this.translate.getDefaultLang() == 'en')
            this.toastr.success('Group added Successfully','Success!')
          else 
            this.toastr.success('تم اضافه جروب جديد','تمت العملية بنجاح')

          this.groupService.getAllGroups().subscribe(data => {
            this.GroupsNames = data

          },
          error => {
            if(this.translate.getDefaultLang() == 'en')
              this.toastr.error('Operation fail!', 'Oops!')
            else 
              this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!')
          }
        );
          // addForm.name = '';
        });
      }

      this.name_ = addForm.name
    }
  }
  deleteGroup(groupId) {

    let url = `${environment.projectName}/aml/api/group/delete/${groupId}`;
    this.http.delete(url).subscribe(data => {

      if(this.translate.getDefaultLang() == 'en')
        this.toastr.success('Group Deleted Successfully','Success!')
      else 
        this.toastr.success('تم حذف الجروب','تمت العملية بنجاح')

      this.groupService.getAllGroups().subscribe(data => {
        this.GroupsNames = data
      },
      error => {
        if(this.translate.getDefaultLang() == 'en')
          this.toastr.error('Operation fail!', 'Oops!')
        else 
          this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!')
      }  
    );
    })

  }
  editGroup(groupId) {
    this.router.navigate(['editGroup', groupId]);

  }
}
