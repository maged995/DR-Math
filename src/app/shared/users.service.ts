import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  constructor(private http:HttpClient,private fb:FormBuilder) { }

  userRolesForm:FormGroup=this.fb.group({
    UserId:["",Validators.required],
    RoleId:["",Validators.required],
    NewPassword:["",Validators.required]
  })

  getAllUsers(){
    return this.http.get(environment.apiUrl+"ApplicationUser/getAll");
  }
  getUserName(UserId){
    return this.http.get(environment.apiUrl+"ApplicationUser/getUserName?UserId="+UserId);
  }
  register(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Register",body);
  }

  login(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/Login",body);
  }

  putRoles(body){
    return this.http.put(environment.apiUrl+"ApplicationUser/",body);
  }
ChangePassword(body){
return this.http.post(environment.apiUrl+"ApplicationUser/ChangePassword",body);
  }


  ChangeAdminPassword(body){
    return this.http.post(environment.apiUrl+"ApplicationUser/AdminChangePassword",body);
      }
}
