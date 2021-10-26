import { Component, Inject, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';
import { OrdersService } from '../../../../shared/orders.service';
import { SubscriberService } from '../../../../shared/subscriber.service';
import { TrainersService } from '../../../../shared/trainers.service';

@Component({
  selector: 'ngx-orders-subscriber',
  templateUrl: './orders-subscriber.component.html',
  styles: []
})
export class OrdersSubscriberComponent implements OnInit {
  Quantity=0; 
  submitted:boolean=false;
  error:number=0;
  ItemId: any;
  submitNow: boolean;
  subscriberList$:Observable<any>;
    constructor( public dialogRef: MatDialogRef<OrdersSubscriberComponent>,
      private snackbar:NotificationService,
      @Inject(MAT_DIALOG_DATA) public data,
    private notify:NotificationService,
private serviceSubscriber:SubscriberService,
      public service:OrdersService,
    
    ) { }
  
    ngOnInit() {
      if(this.data.ItemId==28)
      {
        this.subscriberList$=this.serviceSubscriber.getFinishedForTrainer();
      }
      else 
      {
        this.subscriberList$=this.serviceSubscriber.getAllSubsciberForTrainerByFlag(1);
      }

      this.error=0;
      this.submitNow=true;
      this.service.SubsriberForm.reset({OrderSubscriberId:0,OrderId:0});
      
var  res= this.service.OrderDetailList[this.data.Index];
      

      (<FormArray>this.service.SubsriberForm.get('Subscibers')).clear();
 
    this.Quantity=res.ItemQuantity;
    
   for (let index = 0; index < this.Quantity; index++) {
  
    (<FormArray>this.service.SubsriberForm.get('Subscibers')).push(this.service.addSubsciber()) ;

   }
   /*
   for (var control of(<FormArray> this.service.SubsriberForm.get('Subscibers')).controls) {
   //control.get('ItemId').setValue(res.ItemId); 
   control.get('OrderSubscriberId').setValue(0);
   control.get('OrderId').setValue(0);
  }*/
    }


    onClose(){
      this.service.SubsriberForm.reset();
      this.dialogRef.close(false);
    }

     toSubmit(){
  if(this.error==0)
  {
    this.submitNow=false;
    for (var control of (<FormArray>this.service.SubsriberForm.get('Subscibers')).controls)
    {
    this.service.OrderSubscriberList.push(control.value);
        }
        this.dialogRef.close(true);
  }
     
    }
 onsubmit(){
      this.submitted=true;
      this.error=0;

    if(this.service.SubsriberForm.invalid){
      return;
    }
else
{
this.toSubmit();
}



  }




  



  

}
