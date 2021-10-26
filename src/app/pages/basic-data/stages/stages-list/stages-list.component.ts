import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { StagesService } from '../../../../shared/stages.service';
import { StagesFormComponent } from '../stages-form/stages-form.component';

@Component({
  selector: 'ngx-stages-list',
  templateUrl: './stages-list.component.html',
  styles: []
})
export class StagesListComponent implements OnInit {

  constructor(private service:StagesService,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['StageDesc','actions','anotherActions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
  this.getStages();

  }

  getStages(){
    this.service.getAllStages().subscribe( (res:any)=>{
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

  onCreateOrEdit(StageId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = { StageId };
    this.dialog.open(StagesFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getStages();
    });
  }

  onLevels(StageId)
  {
    this.route.navigateByUrl('/pages/basicData/levels/'+StageId)
  }
  onDelete(StageId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteStage(StageId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getStages();
        })
      }
    })
  }


}
