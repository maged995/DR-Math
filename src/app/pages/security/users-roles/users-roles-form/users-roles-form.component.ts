import { Component, OnInit, Inject } from '@angular/core';
import { UsersService } from '../../../../shared/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../../../../shared/notification.service';
import { Observable } from 'rxjs';
import { RolesService } from '../../../../shared/roles.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngx-users-roles-form',
  templateUrl: './users-roles-form.component.html',
  styleUrls: ['./users-roles-form.component.scss']
})
export class UsersRolesFormComponent implements OnInit {

roleList$:Observable<any>;
  submitted:boolean=false;

    constructor(
      public service:UsersService,public dialogRef: MatDialogRef<UsersRolesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,private serviceRoles:RolesService,
      private notify:NotificationService) { }
  
    ngOnInit() {
 if(this.data.Flag==1)
 {
this.service.userRolesForm.controls['NewPassword'].clearValidators();
this.service.userRolesForm.controls['RoleId'].setValidators([Validators.required]);
this.roleList$=this.serviceRoles.getAllRoles();

this.service.userRolesForm.controls['NewPassword'].updateValueAndValidity();
this.service.userRolesForm.controls['RoleId'].updateValueAndValidity();
 } 
 else if (this.data.Flag==2)
 {
  this.service.userRolesForm.controls['RoleId'].clearValidators();
  this.service.userRolesForm.controls['NewPassword'].setValidators([Validators.required,Validators.minLength(4)]);
  
  this.service.userRolesForm.controls['NewPassword'].updateValueAndValidity();
  this.service.userRolesForm.controls['RoleId'].updateValueAndValidity();
  
 }   

this.service.userRolesForm;
this.service.userRolesForm.controls['UserId'].setValue(this.data.UserId);
  
  
    }
  
    get f(){
      return this.service.userRolesForm.controls;
    }
  
  
    onClose(){
      this.service.userRolesForm.reset();
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.userRolesForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.userRolesForm.value 
  }

console.log(body);    
if(this.data.Flag==1)
{
    this.service.putRoles(body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.service.userRolesForm.reset();
    this.dialogRef.close();
    })
  }
  else if(this.data.Flag==2)
  {
    this.service.ChangeAdminPassword(body).subscribe(res=>{
   if(res==2)
   {
     this.notify.success('تم التعديل بنجاح');

   } 
   else 
   {
     this.notify.error('حدث خطا ');
   }
   this.dialogRef.close();
   
    })
  }

  }
  }
    }


