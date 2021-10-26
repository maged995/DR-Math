import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { OrdersService } from '../../../../shared/orders.service';
import { ItemFormComponent } from '../../items/item-form/item-form.component';

@Component({
  selector: 'ngx-orders-list',
  templateUrl: './orders-list.component.html',
  styles: []
})
export class OrdersListComponent implements OnInit {


  ItemFlagId;
  ItemFlagDesc: any;


  constructor(private service:OrdersService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }

    sub;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['OrderDate','OrderTotalValue','TrainerName','actions','delete','another'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
      this.getOrders();
    


  }

  getOrders(){
    

    this.service.getForAdmin().subscribe( (res:any)=>{
    
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

  onReport(OrderId){
    this.route.navigate(['/pages/basicData/orderReportsAdmin/'+OrderId])
  }

  onDelete(OrderId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الحذف؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.deleteOrder(OrderId).subscribe(res=>{
          this.notify.error('تم الحذف بنجاح');
          this.getOrders();
        })
      }
    })
  }

onApproval(OrderId)
  {
    this.confirm.openConfirmDialog('هل انت متاكد من الاعتماد؟').afterClosed().subscribe(res=>{
      if(res){
        this.service.ApprovalOrder(OrderId).subscribe(res=>{
          this.notify.error('تم الاعتماد بنجاح');
          this.getOrders();
        })
      }
    })
  }

}
