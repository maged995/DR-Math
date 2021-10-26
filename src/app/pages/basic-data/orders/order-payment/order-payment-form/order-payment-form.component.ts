import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../shared/notification.service';
import { PaymentTypeService } from '../../../../../shared/payment-type.service';
import { TrainerAccountPaymentService } from '../../../../../shared/trainer-account-payment.service';
import { TrainersService } from '../../../../../shared/trainers.service';

@Component({
  selector: 'ngx-order-payment-form',
  templateUrl: './order-payment-form.component.html',
  styles: []
})
export class OrderPaymentFormComponent implements OnInit {

 
trainerList$:Observable<any>;
paymentTypeList$:Observable<any>;
  submitted:boolean=false;
     constructor(
       public service:TrainerAccountPaymentService,public dialogRef: MatDialogRef<OrderPaymentFormComponent>,
       @Inject(MAT_DIALOG_DATA) public data,
       private serviceTrainer:TrainersService,private servicePaymentType:PaymentTypeService,
      
       private notify:NotificationService) { }
   
     ngOnInit() {
       this.trainerList$=this.serviceTrainer.getAllTrainers(1);
       this.paymentTypeList$=this.servicePaymentType.getAllPaymentType();
this.service.trainerPaymentForm.reset({TrainerAccountPaymentId:0})
this.service.trainerPaymentForm;
   
     }
   
     get f(){
       return this.service.trainerPaymentForm.controls;
     }
 
   
   
   
     onClose(){
      this.service.trainerPaymentForm.reset({TrainerAccountPaymentId:0})
      this.dialogRef.close();
     }
   
     onSubmit(){
   this.submitted=true;
   if(this.service.trainerPaymentForm.invalid)
   {
   return;
   }
   else
   {
   var body={
   ...this.service.trainerPaymentForm.value 
   }
  
 
   this.service.postPayment(body).subscribe(res=>{
     this.notify.success('تمت الاضافه بنجاح');
     this.service.trainerPaymentForm.reset({TrainerAccountPaymentId:0})
     this.dialogRef.close();
   })
   
  
   }
   
     }


}
