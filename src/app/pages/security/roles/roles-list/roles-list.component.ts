import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';

import { RolesFormComponent } from '../roles-form/roles-form.component';

import { RolesClaimsComponent } from '../roles-claims/roles-claims.component';
import { RolesService } from '../../../../shared/roles.service';

@Component({
  selector: 'ngx-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  constructor(private service:RolesService,
    private route:Router,public dialog: MatDialog,

   ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Name','actions'];
  @ViewChild(MatSort,{static: true  }) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getAllROLes();

  }

  getAllROLes(){
    this.service.getAllRoles().subscribe( (res:any)=>{
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

  onCreateOrEdit(Id){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { Id };
    this.dialog.open(RolesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getAllROLes();
    });
  }


  onShow(Id){
    const  dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="70%"
    dialogConfig.data={ Id};
    this.dialog.open(RolesClaimsComponent,dialogConfig).afterClosed().subscribe(res=>{
      this.getAllROLes();
    })
  }

  


}
