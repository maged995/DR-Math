import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LevelsService } from '../../../../shared/levels.service';
import { NotificationService } from '../../../../shared/notification.service';

@Component({
  selector: 'ngx-levels-form',
  templateUrl: './levels-form.component.html',
  styles: []
})
export class LevelsFormComponent implements OnInit {

  submitted:boolean=false;
     constructor(
       public service:LevelsService,public dialogRef: MatDialogRef<LevelsFormComponent>,
       @Inject(MAT_DIALOG_DATA) public data,
      
       private notify:NotificationService) { }
   
     ngOnInit() {
 

      
       if(this.data.LevelId==null){
 this.service.levelForm;
 
     }
   else
   {
     
   this.service.getOneLevel(this.data.LevelId).subscribe((res:any)=>{
     this.service.levelForm.setValue({
      LevelId:res.LevelId,
      LevelDesc:res.LevelDesc,
      LevelEng:res.LevelEng,
      LevelNo:res.LevelNo,
      LevelIsActive:res.LevelIsActive,
        })
   })
   }
   
     }
   
     get f(){
       return this.service.levelForm.controls;
     }
 
   
   
   
     onClose(){
       this.service.levelForm.reset({LevelId:0,LevelIsActive:true});
       this.dialogRef.close();
     }
   
     onSubmit(){
      
   this.submitted=true;
   if(this.service.levelForm.invalid)
   {
   return;
   }
   else
   {
   var body={
   ...this.service.levelForm.value 
   }
   if(this.data.LevelId==null)
   {
 
 
   this.service.postLevel(body).subscribe(res=>{
     this.notify.success('تمت الاضافه بنجاح');
     this.service.levelForm.reset({LevelId:0,LevelIsActive:true});
     this.dialogRef.close();
   })
   
   }
   else 
   {
     this.service.putLevel(this.data.LevelId,body).subscribe(res=>{
     this.notify.success('تم التعديل بنجاح');
     this.service.levelForm.reset({LevelId:0,LevelIsActive:true});
     this.dialogRef.close();
     })
   }
   }
   
     }

}
