import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { OrdersService } from '../../../../shared/orders.service';
import { ReportsService } from '../../../../shared/reports.service';

@Component({
  selector: 'ngx-order-trainers-reports',
  templateUrl: './order-trainers-reports.component.html',
  styles: []
})
export class OrderTrainersReportsComponent implements OnInit {

  constructor(private service:ReportsService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TrainerName','result','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
      this.getOrders();
    


  }

  getOrders(){
    

    this.service.getAllTrainerAccount().subscribe( (res:any)=>{
    
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

  onClick(TrainerId){
    this.route.navigateByUrl('/pages/basicData/AdminAccountReports/'+TrainerId)
  }


}
