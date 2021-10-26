import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { DialogService } from '../../../../shared/dialog.service';
import { NotificationService } from '../../../../shared/notification.service';
import { OrdersService } from '../../../../shared/orders.service';
import { OrdersDetailsComponent } from '../orders-details/orders-details.component';
import { OrdersSubscriberComponent } from '../orders-subscriber/orders-subscriber.component';

@Component({
  selector: 'ngx-orders-form',
  templateUrl: './orders-form.component.html',
  styles: []
})
export class OrdersFormComponent implements OnInit {

 
  SerialNumbers:number=0;
  submitNow:boolean=false;
  
    ItemOfferList: any[]=[];
    error: number;

  purchase:boolean=false;
    Show:boolean=false;
 
    submitted:boolean=false;

    showSubmit:boolean=true;

  
      constructor(private snackbar:NotificationService,private route:Router,
        public dialog:MatDialog,
      public service:OrdersService,
     private confirm:DialogService) {   
     }
    
      ngOnInit() {
      

         this.Show=true;
 this.submitNow=false;
         this.showSubmit=true;
         
      this.getAll();
  
      }
  
      getAll(){ 
  this.service.ordersForm.reset({OrderId:0});
  this.service.ordersForm;

  this.service.OrderDetailList=[];   

  this.service.ItemDetailList=[];
  this.service.OrderSubscriberList=[];
  
     }
  
    
      get f(){
        return this.service.ordersForm.controls;
      }
    
      addOrEdit(Index){

        const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true;
     dialogConfig.width = "60%";
     dialogConfig.data = { Index};
     this.dialog.open(OrdersDetailsComponent, dialogConfig).afterClosed().subscribe(res=>{
       this.updateGrandTotal();
      
     });
   }
  
   onDelete(Index){
    this.service.OrderDetailList.splice(Index,1);
    this.updateGrandTotal();
 
   }
  

  
  

    
      updateGrandTotal(){
        
        let Detail =parseFloat(this.service.OrderDetailList.reduce((prev,curr)=>{
          return prev+curr.ItemTotalPrice
        },0));
  this.service.ordersForm.controls['OrderTotalValue'].setValue((Detail).toFixed(2));

      }

      onSaveDetail(){
        if  (this.service.OrderDetailList.length==0)
            {
      
           this.submitNow=false;
            }
            else 
            {
              
        /*      let Detail =parseFloat(this.service.OrderDetailList.filter(a=>a.ItemFlagId==7).reduce((prev,curr)=>{
                return prev+curr.ItemQuantity
              },0))
*/
            //  let Detail=parseFloat(this.service.OrderDetailList.filter(a=>a.ItemFlagId==7).reduce(function(a, b){ return {a  b.ItemQuantity; });
            let Detail=parseFloat(this.service.OrderDetailList.filter(a=>a.ItemFlagId==7).reduce((acc, val) => acc += +val.ItemQuantity, 0))
            console.log(Detail);

      this.SerialNumbers=Detail;
       
      
      this.submitNow=true;
            }
         }
    
   
  
     
 


     onSerial(Index,Quantity,ItemId){

        const dialogConfig = new MatDialogConfig();
     dialogConfig.autoFocus = true;
     dialogConfig.disableClose = true;
     dialogConfig.width = "60%";
     dialogConfig.data = { Index ,ItemId};
     this.dialog.open(OrdersSubscriberComponent, dialogConfig).afterClosed().subscribe(res=>{
      
     if(res==true)
     {
  this.SerialNumbers=this.SerialNumbers-Quantity;
  this.service.OrderDetailList[Index].Subscriber=false;
  this.service.OrderDetailList[Index].OrderSubscriber=this.service.OrderSubscriberList;
  this.service.OrderSubscriberList=[];
     }
     });
     }

          onSubmit(){

  this.showSubmit=false;

  if(this.service.ordersForm.invalid ||this.service.OrderDetailList.length==0 

  ){          
    return;
  }

  
else if(this.SerialNumbers>0)
  {
    this.snackbar.error("من فضلك ادخل الاسماء المطلوبه")
  }
       
  else
  {
            var body={
              ...this.service.ordersForm.getRawValue(),
              OrderDetail:this.service.OrderDetailList,
             };
  
       console.log(body);

             this.service.postOrders(body).subscribe(res=>{
          this.snackbar.success('تم تحويل الطلب الي المدير'); 

          this.Show=true;
          this.submitNow=false;
                  this.showSubmit=true;
                  
               this.getAll();
                   
             });
            }   
          
          }
     

          onClose(){
          }

}
