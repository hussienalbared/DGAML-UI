import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { Location } from '@angular/common';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"
import { suspect } from '../../../models/suspect.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ForwardComponent } from '../forward/forward.component';
@Component({
  selector: 'app-suspects',
  templateUrl: './suspects.component.html',
  styleUrls: ['./suspects.component.css']
})
export class SuspectsComponent implements OnInit {
  result: suspect[];
  selectedSuspect:suspect[]=[];
  dataSource: any = null;
  displayedColumns = ['select', 'No', 'Number of Alarm', 'Suspect Name', 'RIM Number',
    'Profile Risk', 'Oldest Alarm', 'User'];
  selection = new SelectionModel<suspect>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private http: HttpClient,private router: Router
  ,public dialog: MatDialog
  ) { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  nAllSelected(){
    this.selectedSuspect=[];
    this.selection.selected.forEach(a=>
    this.selectedSuspect.push(a)
    )
  
  } 

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  ngOnInit() {
    let url = "http://localhost:8081/aml/api/v1/suspectedObject";
    this.http.get<suspect[]>(url).subscribe(data => {
      this.result = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
getSuspectDetail(alarm){

  
  this.router.navigate(['suspectDetail/'+alarm.id.objKey+"/"+alarm.id.objLevelCode+"/"+alarm.objNumber]);
}

openDialog(): void {
  const numSelected = this.selection.selected.length;
  if(numSelected==0)
  {
    alert("Select at least one suspect,please");
  return;
  }
  this.nAllSelected();
  let dialogRef = this.dialog.open(ForwardComponent, {
    
      height: '400px',
      width: '600px',
    
    data: { selected:this.selectedSuspect }
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(dialogRef.componentInstance.name);
//  location.reload();
  },error=>{

  }
  
);
}

}
