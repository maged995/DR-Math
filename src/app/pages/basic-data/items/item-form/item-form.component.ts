import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { ItemsService } from '../../../../shared/items.service';
import { LanguagesService } from '../../../../shared/languages.service';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';
import { SizesService } from '../../../../shared/sizes.service';

@Component({
  selector: 'ngx-item-form',
  templateUrl: './item-form.component.html',
  styles: []
})
export class ItemFormComponent implements OnInit {

languageList$:Observable<any>;
levelsList$:Observable<any>;
sizesList$:Observable<any>;
  submitted:boolean=false;
     constructor(
       public service:ItemsService,public dialogRef: MatDialogRef<ItemFormComponent>,
       @Inject(MAT_DIALOG_DATA) public data,
       private serviceLevels:LevelsService,private serviceLanguages:LanguagesService,
      private serviceSizes:SizesService,
       private notify:NotificationService) { }
   
     ngOnInit() {
      this.service.itemForm.controls['LevelId'].clearValidators();
      this.service.itemForm.controls["LanguageId"].clearValidators();
      this.service.itemForm.controls['SizeNo'].clearValidators(); 
this.service.itemForm.controls["ItemDesc"].clearValidators();

this.service.itemForm.controls['LevelId'].updateValueAndValidity();
this.service.itemForm.controls["LanguageId"].updateValueAndValidity();
this.service.itemForm.controls['SizeNo'].updateValueAndValidity(); 
this.service.itemForm.controls["ItemDesc"].updateValueAndValidity();
 if(this.data.ItemFlagId==1)
 {

   this.languageList$=this.serviceLanguages.getAllLanguages(1);
   this.levelsList$=this.serviceLevels.getAlllevels();
this.service.itemForm.controls['LevelId'].setValidators([Validators.required]);
this.service.itemForm.controls["LanguageId"].setValidators([Validators.required]);

this.service.itemForm.controls['LevelId'].updateValueAndValidity();
this.service.itemForm.controls["LanguageId"].updateValueAndValidity();
 }
 
else if(this.data.ItemFlagId==2)
 {

   this.languageList$=this.serviceLanguages.getAllLanguages(2);
   this.sizesList$=this.serviceSizes.getAllSizes();
 //  this.levelsList$=this.serviceLevels.getAlllevels();
this.service.itemForm.controls['SizeNo'].setValidators([Validators.required]);
this.service.itemForm.controls["LanguageId"].setValidators([Validators.required]);
this.service.itemForm.controls["SizeId"].setValidators([Validators.required]);
this.service.itemForm.controls['SizeNo'].updateValueAndValidity();
this.service.itemForm.controls["LanguageId"].updateValueAndValidity();
this.service.itemForm.controls["SizeId"].updateValueAndValidity();

 }

 else if (this.data.ItemFlagId==3 || this.data.ItemFlagId==4){

 

 this.service.itemForm.controls['SizeNo'].setValidators([Validators.required]);
 
 this.service.itemForm.controls['SizeNo'].updateValueAndValidity();

  
 }

 else if(this.data.ItemFlagId==5|| this.data.ItemFlagId==6 || this.data.ItemFlagId==7)
 {

  
this.service.itemForm.controls["ItemDesc"].setValidators([Validators.required]);

this.service.itemForm.controls["ItemDesc"].updateValueAndValidity();
 }

       if(this.data.ItemId==null){
       this.service.itemForm.reset({ItemId:0,  ItemIsActive:true});
       this.service.itemForm.get('ItemFlagId').setValue(this.data.ItemFlagId)
 this.service.itemForm;
 
     }
   else
   {
     
   this.service.getOneItem(this.data.ItemId).subscribe((res:any)=>{
     this.service.itemForm.setValue({
      ItemId:res.ItemId,
      ItemDesc:res.ItemDesc,
      LevelId:res.LevelId,
      SizeNo:res.SizeNo,
      ItemFlagId:res.ItemFlagId,
      LanguageId:res.LanguageId,
      SizeId:res.SizeId,
    //  ItemBuyPrice:res.ItemBuyPrice,
      ItemSellPrice:res.ItemSellPrice,
      ItemIsActive:res.ItemIsActive
        })
   })
   }
   
     }
   
     get f(){
       return this.service.itemForm.controls;
     }
 
   
   
   
     onClose(){
       this.service.itemForm.reset({ItemId:0,  ItemIsActive:true});
       this.dialogRef.close();
     }
   
     onSubmit(){
      console.log(this.service.itemForm.value)
   this.submitted=true;
   if(this.service.itemForm.invalid)
   {
   return;
   }
   else
   {
   var body={
   ...this.service.itemForm.value 
   }
   if(this.data.ItemId==null)
   {
 
 
   this.service.postItem(body).subscribe(res=>{
     this.notify.success('تمت الاضافه بنجاح');
     this.service.itemForm.reset({ItemId:0,  ItemIsActive:true});
     this.dialogRef.close();
   })
   
   }
   else 
   {
     this.service.putItem(this.data.ItemId,body).subscribe(res=>{
     this.notify.success('تم التعديل بنجاح');
     this.service.itemForm.reset({ItemId:0,  ItemIsActive:true});
     this.dialogRef.close();
     })
   }
   }
   
     }

}
