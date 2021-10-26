import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from '../../../../../shared/dialog.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { TrainerAccountPaymentService } from '../../../../../shared/trainer-account-payment.service';
import { ItemFormComponent } from '../../../items/item-form/item-form.component';
import { OrderPaymentFormComponent } from '../order-payment-form/order-payment-form.component';

@Component({
  selector: 'ngx-order-payment-list',
  templateUrl: './order-payment-list.component.html',
  styles: []
})
export class OrderPaymentListComponent implements OnInit {




  constructor(private service:TrainerAccountPaymentService,
    private route:Router,public dialog: MatDialog,private activateRoute:ActivatedRoute,
    private confirm:DialogService,private notify:NotificationService) { }
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['TrainerName','PaymentDate',"PaymentValue",'PaymentTypeDesc','EmployeeName','actions'];
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
      this.getPayment();
    



  }

  getPayment(){
    
 
    this.service.getAllPayment().subscribe( (res:any)=>{
      
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

  onCreateOrEdit(){
 const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "70%";
  //  dialogConfig.data = {  ItemId,ItemFlagId};
    this.dialog.open(OrderPaymentFormComponent, dialogConfig).afterClosed().subscribe(res => {

      this.getPayment();
    });
  }




}
