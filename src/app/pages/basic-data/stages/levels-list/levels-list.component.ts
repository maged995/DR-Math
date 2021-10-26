import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';
import { StagesService } from '../../../../shared/stages.service';
import { LevelsFormComponent } from '../levels-form/levels-form.component';

@Component({
  selector: 'ngx-levels-list',
  templateUrl: './levels-list.component.html',
  styles: []
})
export class LevelsListComponent implements OnInit {

  StageDesc: any;


  constructor(private service:LevelsService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private serviceStage:StagesService,
    private confirm:DialogService,private notify:NotificationService,private activeRoute:ActivatedRoute) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['LevelDesc','LevelEng','LevelNo','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.sub=this.activeRoute.params.subscribe(res=>{ 
   
      this.getItems();
    
    })


  }

  getItems(){
    
  
    this.service.getAlllevels().subscribe( (res:any)=>{
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

  onCreateOrEdit(LevelId){

 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
    dialogConfig.data = {  LevelId};
    this.dialog.open(LevelsFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getItems();
    });
  }

  onDelete(LevelId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deletelevel(LevelId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getItems();
        })
      }
    })
  }

}
