import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { capability } from '../../../models/groupModel.model';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  capabilities:any=null;
  displayedColumns = ['select','id', 'name', 'description' ];
  selection = new SelectionModel<capability>(true, []);
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.capabilities.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.capabilities.data.forEach(row => this.selection.select(row));
  }
  constructor(private group:GroupService) { }

  ngOnInit() {
    this.group.getAllCapabilities().subscribe(data=>{
// this.capabilities=data;
this.capabilities = new MatTableDataSource(data);

    })

  }

}
