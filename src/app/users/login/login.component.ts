import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../shared/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted:boolean=false;
    constructor(private fb:FormBuilder,private service:UsersService,private router:Router,
        ) { }
  
    ngOnInit() {
      if(localStorage.getItem('token')!=null)
      {
  this.router.navigateByUrl('/pages');
      }
      else
      {
      this.InitializeLogin();
      }
    }
  
    InitializeLogin(){
      this.loginForm=this.fb.group({
        UserName:["",Validators.required],
        Password:["",[Validators.required,Validators.minLength(4)]],
      })
    }
  
    get f(){
      return this.loginForm.controls;
    }
  
    onSubmit(){
      this.submitted=true;
      if(this.loginForm.invalid){
        return;
      }
      else 
      {
        var body={
          ...this.loginForm.value
        }
        console.log(body);
        this.service.login(body).subscribe(
          (res: any) => {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/pages');
            window.location.reload();
        //  window.location.assign('https://7ic.co/math/');
        

          
          },
          err => {
            if (err.status == 400)
            {
            alert('Incorrect username or password.');
            }
           
            else
            {

            console.log(err);
            }
      
          }
        );
      }
    }




}
