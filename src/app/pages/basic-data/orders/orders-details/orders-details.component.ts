import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { empty, Observable } from 'rxjs';
import { ItemFlagsService } from '../../../../shared/item-flags.service';
import { ItemsService } from '../../../../shared/items.service';
import { NotificationService } from '../../../../shared/notification.service';
import { OrdersService } from '../../../../shared/orders.service';

@Component({
  selector: 'ngx-orders-details',
  templateUrl: './orders-details.component.html',
  styles: []
})
export class OrdersDetailsComponent implements OnInit {


ItemFlagList$:Observable<any>;
  ItemList$:Observable<any>;
 
  submitted:boolean=false;
  error:number=0;
  BarcodeValid: boolean=true;

    constructor( public dialogRef: MatDialogRef<OrdersDetailsComponent>,
      private snackbar:NotificationService,
      @Inject(MAT_DIALOG_DATA) public data,
      private serviceItemFlag:ItemFlagsService,
      private serviceItem :ItemsService,
    
      private notify:NotificationService,
    
      public service:OrdersService) { }
  
    ngOnInit() {

    this.ItemFlagList$=this.serviceItemFlag.getAllItemFlag();
    
      this.service.orderDetailForm.reset({OrderDetailId:0,OrderId:0});
   
      if(this.data.Index==null){
        this.service.orderDetailForm
       this.service.orderDetailForm.controls["Subscriber"].setValue(true);

      }
     else 
     {
     
      let res:any= this.service.OrderDetailList[this.data.Index];
      this.ItemList$=this.serviceItem.getAllItemByFlag(res.ItemFlagId);
      this.service.orderDetailForm.setValue({
        OrderDetailId:0,
        OrderId:0,
        ItemId:res.ItemId,
        ItemDesc:res.ItemDesc,
        ItemFlagId:res.ItemFlagId,
        ItemFlagDesc:res.ItemFlagDesc,
        ItemPrice:res.ItemPrice,
        ItemQuantity:res.ItemQuantity,
        ItemTotalPrice:res.ItemTotalPrice,
        Subscriber:res.Subscriber
      })
  
     }
     
    }
  
    get f(){
      return this.service.orderDetailForm.controls;
    }

    changeFlag(ctrl){
      this.service.orderDetailForm.controls['ItemFlagDesc'].setValue(""); 
      this.service.orderDetailForm.controls['ItemId'].setValue(""); 
      this.service.orderDetailForm.controls['ItemDesc'].setValue(""); 
      this.service.orderDetailForm.controls["ItemPrice"].setValue("");
      this.service.orderDetailForm.controls["ItemTotalPrice"].setValue("");

      this.ItemList$=empty();
   
      if(typeof(ctrl)==="undefined"){

      }
      else 
      {
       
      
        this.ItemList$=this.serviceItem.getAllItemByFlag(ctrl.ItemFlagId);
        this.service.orderDetailForm.controls['ItemFlagDesc'].setValue(ctrl.ItemFlagDesc); 
this.getTotal();
      }
    }

    changeItems(ctrl){

      this.service.orderDetailForm.controls['ItemDesc'].setValue(""); 
      this.service.orderDetailForm.controls["ItemPrice"].setValue("");
      this.service.orderDetailForm.controls["ItemTotalPrice"].setValue("");
   

 
      if(typeof(ctrl)==="undefined"){

      }
      else 
      {
       
      
        this.service.orderDetailForm.controls['ItemDesc'].setValue(ctrl.ItemDesc); 
        this.service.orderDetailForm.controls["ItemPrice"].setValue(ctrl.ItemSellPrice);
        

      }
    }


    getTotal(){
      let ItemPrice=this.service.orderDetailForm.controls["ItemPrice"].value;
      let ItemQuantity=this.service.orderDetailForm.controls["ItemQuantity"].value;
  
      if(ItemQuantity>0 && ItemPrice>0)
      {
        let p=parseFloat((ItemPrice*ItemQuantity).toFixed(2));
     
        this.service.orderDetailForm.controls["ItemTotalPrice"].setValue(p)
    
      }
      else 
      {
        this.service.orderDetailForm.controls["ItemTotalPrice"].setValue("");

        
      }
      }
   

    onClose(){
      this.dialogRef.close();
    }



  
    onsubmit(){
      this.submitted=true;

    if(this.service.orderDetailForm.invalid){
     console.log(this.service.orderDetailForm.value)
      return;
    }
  
    else 
    {


    if(this.data.Index==null){

      this.service.OrderDetailList.forEach(element => {
        if(element.ItemId==this.service.orderDetailForm.get('ItemId').value)
       {
  this.snackbar.error('هذا المنتج  موجود من قبل ');
  this.error=1
       }    
      });
      if(this.error==0)
      {
    this.service.OrderDetailList.push(this.service.orderDetailForm.getRawValue());
     
    this.dialogRef.close();
      }
  }
  else 
  {
    this.service.OrderDetailList.forEach(element => {
      if(element.ItemId==this.service.orderDetailForm.get('ItemId').value && this.service.orderDetailForm.get('ItemId').value !=this.service.OrderDetailList[this.data.Index].ItemId)
      {
        this.snackbar.error('هذا المنتج  موجوده من قبل ');
this.error=1;
       }
       
      });
      if(this.error==0)
      {
this.service.OrderDetailList[this.data.Index]=this.service.orderDetailForm.getRawValue();
this.dialogRef.close();
  }
}
}
     
  this.submitted=false;
    }






   

  


}
