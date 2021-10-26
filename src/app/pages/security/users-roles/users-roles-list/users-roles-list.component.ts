import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../shared/users.service';
import { MatDialogConfig, MatTableDataSource, MatDialog, MatSort, MatPaginator } from '@angular/material';
import { UsersRolesFormComponent } from '../users-roles-form/users-roles-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements OnInit {


  constructor(private service:UsersService,
    private route:Router,public dialog: MatDialog,

   ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['UserName',"Name","EmployeeName",'actions','another'];
  @ViewChild(MatSort,{static: true  }) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getAllROLes();

  }

  getAllROLes(){
    this.service.getAllUsers().subscribe( (res:any)=>{
      this.listData = new MatTableDataSource(res);
     
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;

      this.listData.filterPredicate = (data, filter) => {
     
        return this.displayedColumns.some(ele => {
          if(typeof data[ele]==="string")
          {
          return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          }
        });        
      };
    });
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(UserId,Flag){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { UserId,Flag };
    this.dialog.open(UsersRolesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getAllROLes();
    });
  }



}
