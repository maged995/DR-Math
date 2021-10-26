import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SubscriberService } from '../../../../shared/subscriber.service';
import { SubscriberDegreeComponent } from '../subscriber-degree/subscriber-degree.component';
import { SubscriberFormComponent } from '../subscriber-form/subscriber-form.component';

@Component({
  selector: 'ngx-subscriber-finished',
  templateUrl: './subscriber-finished.component.html',
  styleUrls: ['./subscriber-finished.component.scss']
})
export class SubscriberFinishedComponent implements OnInit {

  SubscriberFlagId: any;


  constructor(private service:SubscriberService,
    private route:Router,
    
    private confirm:DialogService,private notify:NotificationService) { }
  
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['SubscriberCode','SubscriberNameAr','SubscriberNameEn','TrainerName','LevelDesc','FinishedDate','EstimateNameAr','actions','other']
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
      this.getSubscriber();
  }

  getSubscriber(){
    
    this.service.getFinished().subscribe( (res:any)=>{
      
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

  onPrint(SubscriberLevelId){
this.route.navigateByUrl('/pages/basicData/certificate/'+SubscriberLevelId)
  }

  onPrintAr(SubscriberLevelId){
    this.route.navigateByUrl('/pages/basicData/certificateAr/'+SubscriberLevelId)

  }


  


  


}
