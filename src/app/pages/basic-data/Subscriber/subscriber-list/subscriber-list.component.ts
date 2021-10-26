import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SubscriberService } from '../../../../shared/subscriber.service';
import { SubscriberAddComponent } from '../subscriber-add/subscriber-add.component';
import { SubscriberDegreeComponent } from '../subscriber-degree/subscriber-degree.component';
import { SubscriberFormComponent } from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'ngx-subscriber-list',
  templateUrl: './subscriber-list.component.html',
  styles: []
})
export class SubscriberListComponent implements OnInit,OnDestroy {

  SubscriberFlagId: any;


  constructor(private service:SubscriberService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    
    private confirm:DialogService,private notify:NotificationService) { }
  ngOnDestroy(): void {
this.sub.unsubscribe();
  }
    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['SubscriberCode','SubscriberNameAr','actions','another1','another','finish'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {

  
    this.sub=this.activateRoute.params.subscribe(res=>{ 
      this.SubscriberFlagId=this.activateRoute.snapshot.paramMap.get('id');
      this.getSubscriber();
    
    })


  }

  getSubscriber(){
    
    this.SubscriberFlagId=this.activateRoute.snapshot.paramMap.get('id');
 
    this.service.getAllSubsciberForTrainerByFlag(this.SubscriberFlagId).subscribe( (res:any)=>{
      
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

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80vw";
    dialogConfig.maxHeight="100vh";
    dialogConfig.data = {};
    this.dialog.open(SubscriberAddComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getSubscriber();
    });
  }

  onCreateOrEdit(SubscriberId){
let SubscriberFlagId=this.SubscriberFlagId;
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "80vw";
    dialogConfig.maxHeight="100vh";
    dialogConfig.data = {  SubscriberId,SubscriberFlagId};
    this.dialog.open(SubscriberFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getSubscriber();
    });
  }

  onDelete(SubscriberId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteSubscriber(SubscriberId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getSubscriber();
        })
      }
    })
  }

  onClose(SubscriberId){
    this.confirm.openConfirmDialog('هل انت متاكد من انقطاع الطالب؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.closeSubscriber(SubscriberId).subscribe(res=>{
          this.notify.error('تمت العمليه  بنجاح');
          this.getSubscriber();
        })
      }
    })
  }

  onFinish(SubscriberId)
  {
    
    
       const dialogConfig = new MatDialogConfig();
          dialogConfig.autoFocus = true;
          dialogConfig.disableClose = true;
          dialogConfig.width = "80vw";
          dialogConfig.maxHeight="100vh";
          dialogConfig.data = {  SubscriberId};
          this.dialog.open(SubscriberDegreeComponent, dialogConfig).afterClosed().subscribe(res => {
      
            this.getSubscriber();
          });
        
      
  }


  onPosition(SubscriberId){
    this.confirm.openConfirmDialog('هل انت متاكد من تعديل مكان الطالب؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.getPosition().then(pos=>
          {
            console.log(pos);
            if(pos==null)
            {
              this.notify.success("تم  الموقع بنجاح");
              this.getSubscriber();
            }
            else 
            {
            let latitude=pos.lat;
            let longitude=pos.lng;
            
this.service.ToPosition(SubscriberId,latitude,longitude).subscribe(yes=>{
  this.notify.success("تم تعديل الموقع بنجاح");
  this.getSubscriber();
})

            }
          });
        }
        })
      

    
  }



}
