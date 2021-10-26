import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { UsersService } from '../../shared/users.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {


  changePasswordForm:FormGroup;

  submitted:boolean=false;
    constructor(private fb:FormBuilder,private route:Router,
    
     private service:UsersService,
    private serviceNotify:NotificationService
     ) { }
  
    ngOnInit() {
      this.registerInitialize();
  
    }
  
    registerInitialize(){
      this.changePasswordForm=this.fb.group({
     
        CurrentPassword:["",[Validators.required,Validators.minLength(4)]],
        NewPassword:["",[Validators.required,Validators.minLength(4)]]
       
      })
     
  //  this.employeeList= this.serviceEmployee.getAllEmployeesForRegister();
    }
  
    get f(){
      return this.changePasswordForm.controls;
    }
  
    onSubmit(){
      this.submitted=true;
      if(this.changePasswordForm.invalid){
        return;
      }
      else{
        var body={
          ...this.changePasswordForm.value
        }
        this.service.ChangePassword(body).subscribe(
          (res: any) => {
            if (res.Succeeded) {
              this.submitted=false;
             this.registerInitialize();
             alert('تم تغيير كلمة السر بنجاح');
   
            } 
            else {
              res.Errors.forEach(element => {
              
                    alert(element.Description);
        
              });
            }
      });
    }
  }
  
  onclose(){
  this.route.navigate(['/pages']);
  }


}
