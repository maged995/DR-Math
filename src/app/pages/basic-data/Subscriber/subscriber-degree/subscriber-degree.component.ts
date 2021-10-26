import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { empty, Observable } from 'rxjs';
import { EstimatesService } from '../../../../shared/estimates.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SubscriberService } from '../../../../shared/subscriber.service';

@Component({
  selector: 'ngx-subscriber-degree',
  templateUrl: './subscriber-degree.component.html',
  styleUrls: ['./subscriber-degree.component.scss']
})
export class SubscriberDegreeComponent implements OnInit {


  estimateList$:Observable<any>;
 
   submitted:boolean=false;
      constructor(
        public service:SubscriberService,public dialogRef: MatDialogRef<SubscriberDegreeComponent>,
        @Inject(MAT_DIALOG_DATA) public data,private serviceEstimates:EstimatesService,
        
       
        private notify:NotificationService) { }
    
      ngOnInit() {
       
 
     this.estimateList$=this.serviceEstimates.getAllEstimates();
        this.service.subscribeDegreeForm.reset();
        this.service.subscriberForm;

        this.service.subscribeDegreeForm.get('SubscriberId').setValue(this.data.SubscriberId);
    
       
  
      }
   
 
    
    
      get f(){
        return this.service.subscribeDegreeForm.controls;
      }
  
    
    
    
      onClose(){
       this.service.subscribeDegreeForm.reset();
        this.dialogRef.close();
      }
 
 
    
      onSubmit(){
    this.submitted=true;
    if(this.service.subscribeDegreeForm.invalid)
    {
    return;
    }
    else
    {
 
    var body={
    ...this.service.subscribeDegreeForm.value 
    }
   
    this.service.postEstimateStudent(body).subscribe(res=>{
      this.notify.success('تمت الاضافه بنجاح');
      this.service.subscribeDegreeForm.reset();
      this.dialogRef.close();
    })
    

    }
    
      }
 

}
