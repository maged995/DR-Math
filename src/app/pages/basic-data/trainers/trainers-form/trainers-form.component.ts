import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { GendersService } from '../../../../shared/genders.service';
import { GovernoratesService } from '../../../../shared/governorates.service';
import { NotificationService } from '../../../../shared/notification.service';
import { TrainersService } from '../../../../shared/trainers.service';

@Component({
  selector: 'ngx-trainers-form',
  templateUrl: './trainers-form.component.html',
  styles: []
})
export class TrainersFormComponent implements OnInit {
  submitted:boolean=false;
  governorateList$:Observable<any>;
  genderList$:Observable<any>;

    constructor(
      public service:TrainersService,public dialogRef: MatDialogRef<TrainersFormComponent>,
      private serviceGender:GendersService,private serviceGovernorates:GovernoratesService,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }
  
    ngOnInit() {

this.governorateList$=this.serviceGovernorates.getAllGovernorates();
this.genderList$=this.serviceGender.getAllGenders();
      if(this.data.TrainerId==null){
        this.service.trainerForm.reset({TrainerId:0,IsActive:true,IsLogIn:false});
this.service.trainerForm;
this.service.trainerForm.get('TrainerFlag').setValue(this.data.TrainerFlag)
    }
  else
  {
  this.service.getOneTrainer(this.data.TrainerId).subscribe((res:any)=>{
    console.log(res);
    this.service.trainerForm.setValue({
      TrainerId:res.TrainerId,
      TrainerName:res.TrainerName,
      TrainerNameEn:res.TrainerNameEn,
      TrainerPhone:res.TrainerPhone,
      GovernorateId:res.GovernorateId,
      Town:res.Town,
      TrainerFlag:res.TrainerFlag,
      Villige:res.Villige,
      GenderId:res.GenderId,
      IsActive:res.IsActive,
      IsLogIn:res.IsLogIn
       })
  })
  }
  
    }
  
    get f(){
      return this.service.trainerForm.controls;
    }
  
  
    onClose(){
      this.service.trainerForm.reset({TrainerId:0,IsActive:true,IsLogIn:false});
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.trainerForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.trainerForm.value 
  }
  if(this.data.TrainerId==null)
  {
console.log(this.service.trainerForm.value);
  this.service.postTrainer(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.service.trainerForm.reset({TrainerId:0,IsActive:true,IsLogIn:false});
    this.dialogRef.close();
  })
  
  }
  else 
  {
    this.service.putTrainer(this.data.TrainerId,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.trainerForm.reset({TrainerId:0,IsActive:true,IsLogIn:false});
    this.dialogRef.close();
    })
  }
  }
  
    }

}
