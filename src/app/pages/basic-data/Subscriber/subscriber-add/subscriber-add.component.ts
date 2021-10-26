import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SubscriberService } from '../../../../shared/subscriber.service';

@Component({
  selector: 'ngx-subscriber-add',
  templateUrl: './subscriber-add.component.html',
  styles: []
})
export class SubscriberAddComponent implements OnInit { 
 levelsList$:Observable<any>;
 subScriberList$:Observable<any>;
  submitted:boolean=false;
     constructor(
       public service:SubscriberService,public dialogRef: MatDialogRef<SubscriberAddComponent>,
       @Inject(MAT_DIALOG_DATA) public data, 
       private serviceLevels:LevelsService,
       private notify:NotificationService) { }
   
     ngOnInit() {
    
       this.levelsList$=this.serviceLevels.getAlllevels();
this.subScriberList$=this.service.getSubscriberAdd();
    this.service.subscriberAdd.reset();
      this.service.subscriberAdd;
     }
      

      
 
     get f(){
       return this.service.subscriberAdd.controls;
     }
 
   
   
   
     onClose(){
      this.service.subscriberAdd.reset();

       this.dialogRef.close();
     }


   
   
     onSubmit(){

   this.submitted=true;
   if(this.service.subscriberAdd.invalid)
   {
   return;
   }


   else 
   {
     var body={
       ...this.service.subscriberAdd.value
     }
this.service.postSubscriberLevel(body).subscribe(res=>{
  this.service.subscriberAdd.reset();
  this.notify.success('تمت الاضافة بنجاح');
  this.dialogRef.close();
})

   }



  }


}
