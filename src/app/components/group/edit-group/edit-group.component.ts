import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { capability } from '../../../models/groupModel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { group } from '../../models/group.model';
import { NgForm } from '@angular/forms';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

import { environment } from '../../../../environments/environment';  @Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  id: number = null;
  group: group = null;
  capabilities: any = null;
  displayedColumns = ['select', 'name', 'description'];
  selection = new SelectionModel<capability>(true, []);
  selection2 = new SelectionModel<capability>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.group.capabilities.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.group.capabilities.forEach(row => this.selection.select(row));
  }

  // 
  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.capabilities.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    this.isAllSelected2() ?
      this.selection2.clear() :
      this.capabilities.data.forEach(row => this.selection2.select(row));
  }
  constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router,
    public translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }
  // 

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.groupService.findGroup(this.id).subscribe(data => {
        this.group = data;
        this.group.capabilities.forEach(row => this.selection.select(row));

        this.groupService.getRemainingCapabilities(this.group.id).subscribe(data => {

        

          this.capabilities = new MatTableDataSource<capability>(data);

        })

      })

    })



  }
  ff(x: NgForm) {

    let g: group = {
      "id": this.id,
      "name": x.name ? x.name : this.group.name,
      "capabilities": this.selection.selected.concat(this.selection2.selected)
    }
    this.groupService.updateGroup(g).subscribe(res => {
      if(this.translate.getDefaultLang() == 'en')
        this.toastr.success('Group Updated Successfully','Success!')
      else 
        this.toastr.success('تم تحديث بيانات الجروب','تمت العملية بنجاح')
    },
    error => {
      if(this.translate.getDefaultLang() == 'en')
        this.toastr.error('Operation fail!', 'Oops!')
      else 
        this.toastr.error('هناك خطأ, تأكد من اتصالك بالانترنت او السيرفر ', 'Oops!')
    });
   
this.router.navigate(['/groups']);

  }

 
}
