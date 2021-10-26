import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { StagesService } from '../../../../shared/stages.service';

@Component({
  selector: 'ngx-stages-form',
  templateUrl: './stages-form.component.html',
  styles: []
})
export class StagesFormComponent implements OnInit {


  submitted:boolean=false;

    constructor(
      public service:StagesService,public dialogRef: MatDialogRef<StagesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }
  
    ngOnInit() {

      if(this.data.StageId==null){
this.service.stageForm;
    }
  else
  {
  this.service.getOneStage(this.data.StageId).subscribe((res:any)=>{
    this.service.stageForm.setValue({
      StageId:res.StageId,
      StageDesc:res.StageDesc,
      IsActive:res.IsActive
       })
  })
  }
  
    }
  
    get f(){
      return this.service.stageForm.controls;
    }
  
  
    onClose(){
      this.service.stageForm.reset({StageId:0,IsActive:true});
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.stageForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.stageForm.value 
  }
  if(this.data.StageId==null)
  {


  this.service.postStage(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.stageForm.reset({StageId:0,IsActive:true});
    this.dialogRef.close();
  })
  
  }
  else 
  {
    this.service.putStage(this.data.StageId,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.stageForm.reset({StageId:0,IsActive:true});
    this.dialogRef.close();
    })
  }
  }
  
    }


}
