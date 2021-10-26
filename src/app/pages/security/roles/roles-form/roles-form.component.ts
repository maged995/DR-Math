import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolesService } from '../../../../shared/roles.service';
import { NotificationService } from '../../../../shared/notification.service';


@Component({
  selector: 'ngx-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {

  submitted:boolean=false;

    constructor(private fb:FormBuilder,
      public service:RolesService,public dialogRef: MatDialogRef<RolesFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private notify:NotificationService) { }
  
    ngOnInit() {
      if(this.data.Id==null){

  this.service.rolesForm;
    }
  else
  {
  this.service.getOneRole(this.data.Id).subscribe((res:any)=>{

    this.service.rolesForm.setValue({
    Id:res.Id ,
    RoleName:res.Name
    })
  })
  }
  
    }
  
    get f(){
      return this.service.rolesForm.controls;
    }
  
  
    onClose(){
      this.service.rolesForm.reset();
      this.dialogRef.close();
    }
  
    onSubmit(){
     
  this.submitted=true;
  if(this.service.rolesForm.invalid)
  {
  return;
  }
  else
  {
  var body={
  ...this.service.rolesForm.value 
  }
  if(this.data.Id==null)
  {
  this.service.postRole(body).subscribe(res=>{
    this.notify.success('تمت الاضافه بنجاح');
    this.dialogRef.close();

  })
  }
  else 
  {
    this.service.PutRole(this.data.Id,body).subscribe(res=>{
    this.notify.success('تم التعديل بنجاح');
    this.dialogRef.close();
    })
  }

  this.service.rolesForm.reset();
  }
  
    }
}
