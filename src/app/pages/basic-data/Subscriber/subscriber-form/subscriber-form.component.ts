import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { empty, Observable } from 'rxjs';
import { GendersService } from '../../../../shared/genders.service';
import { GovernoratesService } from '../../../../shared/governorates.service';
import { LanguagesService } from '../../../../shared/languages.service';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SchoolTypeService } from '../../../../shared/school-type.service';
import { SubscriberFlagService } from '../../../../shared/subscriber-flag.service';
import { SubscriberService } from '../../../../shared/subscriber.service';

@Component({
  selector: 'ngx-subscriber-form',
  templateUrl: './subscriber-form.component.html',
  styles: []
})
export class SubscriberFormComponent implements OnInit {

 genderList$:Observable<any>;
 governmentList$:Observable<any>;

   languageList$:Observable<any>;
   subscriberFlagList$:Observable<any>;
 levelsList$:Observable<any>;
 subScriberList$:Observable<any>;
  submitted:boolean=false;
     constructor(
       public service:SubscriberService,public dialogRef: MatDialogRef<SubscriberFormComponent>,
       @Inject(MAT_DIALOG_DATA) public data,private serviceGender:GendersService,
       private serviceGovernate:GovernoratesService,
       private serviceSubscriberFlag:SubscriberFlagService,
       
       private serviceLevels:LevelsService,private serviceLanguages:LanguagesService,
      
       private notify:NotificationService) { }
   
     ngOnInit() {
       this.genderList$=this.serviceGender.getAllGenders();
       this.levelsList$=this.serviceLevels.getAlllevels();
       this.governmentList$=this.serviceGovernate.getAllGovernorates();
       this.languageList$=this.serviceLanguages.getAllLanguages(1);
      
      this.service.subscriberForm.controls['LevelId'].clearValidators();
      this.service.subscriberForm.controls['SchoolTypeId'].clearValidators(); 
      this.service.subscriberForm.controls["BirthDate"].clearValidators();
      this.service.subscriberForm.controls['GenderId'].clearValidators();
      this.service.subscriberForm.controls['SubscriberNumber'].clearValidators(); 
      this.service.subscriberForm.controls["SubscriberTeacherName"].clearValidators();
      this.service.subscriberForm.controls["latitude"].clearValidators();
      this.service.subscriberForm.controls["Longitude"].clearValidators();
      this.service.subscriberForm.controls["SubscriberIdFrom"].clearValidators();
      this.service.subscriberForm.controls["Path"].clearValidators();
      this.service.subscriberForm.controls['LevelId'].updateValueAndValidity();
      this.service.subscriberForm.controls['SchoolTypeId'].updateValueAndValidity(); 
      this.service.subscriberForm.controls["BirthDate"].updateValueAndValidity();
      this.service.subscriberForm.controls['GenderId'].updateValueAndValidity();
      this.service.subscriberForm.controls['SubscriberNumber'].updateValueAndValidity(); 
      this.service.subscriberForm.controls["SubscriberTeacherName"].updateValueAndValidity();
      this.service.subscriberForm.controls["latitude"].updateValueAndValidity();
      this.service.subscriberForm.controls["Longitude"].updateValueAndValidity();
      this.service.subscriberForm.controls["SubscriberIdFrom"].updateValueAndValidity();
      this.service.subscriberForm.controls["Path"].updateValueAndValidity();

      
 if(this.data.SubscriberFlagId==1)
 {
  this.subscriberFlagList$=this.serviceSubscriberFlag.getAllSubscriberFlag();

  this.service.subscriberForm.controls['LevelId'].setValidators([Validators.required]);
    
      this.service.subscriberForm.controls["BirthDate"].setValidators([Validators.required]);
      this.service.subscriberForm.controls['GenderId'].setValidators([Validators.required]);
      this.service.subscriberForm.controls['SubscriberIdFrom'].setValidators([Validators.required]);
      this.service.subscriberForm.controls['Path'].setValidators([Validators.required]);

      
      this.service.subscriberForm.controls['LevelId'].updateValueAndValidity();
   
      this.service.subscriberForm.controls["BirthDate"].updateValueAndValidity();
      this.service.subscriberForm.controls['GenderId'].updateValueAndValidity();
      this.service.subscriberForm.controls['SubscriberIdFrom'].updateValueAndValidity();
      this.service.subscriberForm.controls['Path'].updateValueAndValidity();

      


 }
 
else if(this.data.SubscriberFlagId==2)
 {

 // this.service.subscriberForm.controls['SubscriberNumber'].setValidators([Validators.required,Validators.pattern("[0-9]*")]); 
  this.service.subscriberForm.controls["SubscriberTeacherName"].setValidators([Validators.required]);
  this.service.subscriberForm.controls["latitude"].setValidators([Validators.required]);
 this.service.subscriberForm.controls["Longitude"].setValidators([Validators.required]);
 // this.service.subscriberForm.controls['SubscriberNumber'].updateValueAndValidity();
  this.service.subscriberForm.controls["SubscriberTeacherName"].updateValueAndValidity();
  this.service.subscriberForm.controls["latitude"].updateValueAndValidity();
  this.service.subscriberForm.controls["Longitude"].updateValueAndValidity();
 }

 else if (this.data.SubscriberFlagId==3 || this.data.SubscriberFlagId==4){

 // this.service.subscriberForm.controls['SubscriberNumber'].setValidators([Validators.required,Validators.pattern("[0-9]*")]); 
 this.service.subscriberForm.controls["latitude"].setValidators([Validators.required]);
  this.service.subscriberForm.controls["Longitude"].setValidators([Validators.required]);
 // this.service.subscriberForm.controls['SubscriberNumber'].updateValueAndValidity();
  this.service.subscriberForm.controls["latitude"].updateValueAndValidity();
  this.service.subscriberForm.controls["Longitude"].updateValueAndValidity();

  
 }

       if(this.data.SubscriberId==null){
       this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});
       this.service.subscriberForm.get('SubscriberFlagId').setValue(this.data.SubscriberFlagId);
       console.log("aaaa");

       if(this.data.SubscriberFlagId==2 || this.data.SubscriberFlagId==3|| this.data.SubscriberFlagId==4)
       {
       this.service.getPosition().then(pos=>
        {
          
          this.service.subscriberForm.get('latitude').setValue(pos.lat);
          this.service.subscriberForm.get('Longitude').setValue(pos.lng)
        });
      }
      
 this.service.subscriberForm;
 
     }
   else
   {
     

   this.service.getOneSubscriber(this.data.SubscriberId).subscribe((res:any)=>{
     if(this.data.SubscriberFlagId==1)
     {
       this.subScriberList$=this.service.getAllSubsciberForTrainerByFlag(res.SubscriberFlag)
     }
    var d = new Date(res.BirthDate);
    d.setMinutes( d.getMinutes() +480);
     this.service.subscriberForm.setValue({
      SubscriberId:res.SubscriberId,
      SubscriberCode:res.SubscriberCode,
      SubscriberDate:res.SubscriberDate,
      SubscriberNameAr:res.SubscriberNameAr,
      SubscriberNameEn:res.SubscriberNameEn,
      SubscriberFlagId:res.SubscriberFlagId,
      SubscriberPhone:res.SubscriberPhone,
      LanguageId:res.LanguageId,
      GovernorateId:res.GovernorateId,
      Town:res.Town,
      Village:res.Village,
      BirthDate:res.BirthDate,
      GenderId:res.GenderId,
      LevelId:res.LevelId,
      latitude:res.latitude,
      Longitude:res.Longitude,
      SchoolTypeId:res.SchoolTypeId,
      SubscriberNumber:res.SubscriberNumber,
      SubscriberTeacherName:res.SubscriberTeacherName,
      SubscriberIsActive:res.SubscriberIsActive,
      SubscriberIdFrom:res.SubscriberIdFrom,
      SubscriberFlag:res.SubscriberFlag,
Path:res.Path
        })
   })
   }
   
     }

     onFileSelect(event) {
      if (event.target.files.length > 0 && event.target.files[0]['type'].split('/')[0]==='image' ) {
     
        const file = event.target.files[0];

        this.service.subscriberForm.get('Path').setValue(file);
      }
      else 
      {
       
        event.srcElement.value = null;
        this.service.subscriberForm.get('Path').setValue("");
      }
   
    }
   
     get f(){
       return this.service.subscriberForm.controls;
     }
 
   
   
   
     onClose(){
      this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});

       this.dialogRef.close();
     }


     changeSubscriberFlag(ctrl){
       this.service.subscriberForm.get('SubscriberIdFrom').setValue("");
       this.subScriberList$=empty();
      if(typeof(ctrl)==="undefined"){

      }
      else 
      {
        this.subScriberList$=this.service.getAllSubsciberForTrainerByFlag(ctrl.SubscriberFlagId)
      } 
     }
   
     onSubmit(){
    console.log(this.service.subscriberForm.value);
   this.submitted=true;
   if(this.service.subscriberForm.invalid)
   {
   return;
   }

   else if (this.data.SubscriberFlagId==1)
   {
     
    const formData = new FormData();
    formData.append('SubscriberCode', this.service.subscriberForm.get('SubscriberCode').value);
      formData.append('SubscriberDate',this.service.subscriberForm.get('SubscriberDate').value);
    formData.append('SubscriberNameAr',this.service.subscriberForm.get('SubscriberNameAr').value);
    formData.append('SubscriberNameEn',this.service.subscriberForm.get('SubscriberNameEn').value);
    formData.append('SubscriberFlagId', this.service.subscriberForm.get('SubscriberFlagId').value);
      formData.append('SubscriberPhone',this.service.subscriberForm.get('SubscriberPhone').value);
    formData.append('LanguageId',this.service.subscriberForm.get('LanguageId').value);
    formData.append('GovernorateId',this.service.subscriberForm.get('GovernorateId').value);
    formData.append('Town', this.service.subscriberForm.get('Town').value);
      formData.append('Village',this.service.subscriberForm.get('Village').value);
    formData.append('BirthDate',this.service.subscriberForm.get('BirthDate').value);
    formData.append('GenderId',this.service.subscriberForm.get('GenderId').value);
    formData.append('LevelId', this.service.subscriberForm.get('LevelId').value);
    formData.append('SubscriberIdFrom', this.service.subscriberForm.get('SubscriberIdFrom').value);
    formData.append('SubscriberIsActive',this.service.subscriberForm.get('SubscriberIsActive').value);
    formData.append('Path',this.service.subscriberForm.get('Path').value);

    if(this.data.SubscriberId==null)
    {
     

      this.service.postStudent(formData).subscribe(res=>{
        this.notify.success('تمت الاضافه بنجاح');
        this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});
        this.dialogRef.close();
      })
      
      
    }
    else
    {
      formData.append('SubscriberId',this.service.subscriberForm.get('SubscriberId').value);
      
      this.service.putStudent(formData).subscribe(res=>{
        this.notify.success('تم التعديل بنجاح');
        this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});
        this.dialogRef.close();

    })

   }
  }
   else
   {

   var body={
   ...this.service.subscriberForm.value 
   }
   if(this.data.SubscriberId==null)
   {
 
 
   this.service.postSubscriber(body).subscribe(res=>{
     this.notify.success('تمت الاضافه بنجاح');
     this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});
     this.dialogRef.close();
   })
   
   }
   else 
   {
     this.service.putSubscriber(this.data.SubscriberId,body).subscribe(res=>{
     this.notify.success('تم التعديل بنجاح');
     this.service.subscriberForm.reset({SubscriberId:0,  SubscriberIsActive:true});
     this.dialogRef.close();
     })
   }
   }
   
     }

   



}
