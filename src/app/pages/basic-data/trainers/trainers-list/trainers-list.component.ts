import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { TrainersService } from '../../../../shared/trainers.service';
import { TrainersFormComponent } from '../trainers-form/trainers-form.component';

@Component({
  selector: 'ngx-trainers-list',
  templateUrl: './trainers-list.component.html',
  styles: []
})
export class TrainersListComponent implements OnInit,OnDestroy {
  TrainerFlag: any;

  sub;
  ngOnDestroy(): void {
    this.sub.unsubscribe();
      }
  
  constructor(private service:TrainersService,
    private activateRoute:ActivatedRoute,
    private route:Router,public dialog: MatDialog,
    private confirm:DialogService,private notify:NotificationService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TrainerName','GenderDesc','TrainerPhone','GovernorateDesc','Town','Villige','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {

    this.sub=this.activateRoute.params.subscribe(res=>{ 
      this.TrainerFlag=this.activateRoute.snapshot.paramMap.get('id');
      this.getTrainers();
    
    })

  }

  getTrainers(){
    this.service.getAllTrainers(this.TrainerFlag).subscribe( (res:any)=>{
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

  onCreateOrEdit(TrainerId){
let TrainerFlag=this.TrainerFlag;
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80vw";
    dialogConfig.maxHeight="100vh";
    dialogConfig.data = { TrainerId,TrainerFlag };
    this.dialog.open(TrainersFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getTrainers();
    });
  }


  onDelete(TrainerId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteTrainer(TrainerId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getTrainers();
        })
      }
    })
  }


}
