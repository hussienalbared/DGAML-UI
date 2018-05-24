import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AccountsService } from '../../../services/accounts.service';
import { TabsServiceService } from '../../../services/tabs-service.service';

@Component({
  selector: 'app-account-alarm-in-brief',
  templateUrl: './account-alarm-in-brief.component.html',
  styleUrls: ['./account-alarm-in-brief.component.css']
})
export class AccountAlarmInBriefComponent implements OnInit {
  AccountKey: string;
  displayedColumns = ['select', 'alarmId', 'primaryObjLevelCode', 'routineName',
  'routineCategoryCode', 'routineDescription', 'runDate'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  dataSource: any = [];
 
  constructor( private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private suspectService: AccountsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.AccountKey = params.get('account_Key');
     
      this.getAlarms();

    });
  }
  getAlarms() {
  
   
    this.suspectService.getAccountAlarmsInBrief(this.AccountKey).subscribe(data => {
      this.dataSource = data;

      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   

    });

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
