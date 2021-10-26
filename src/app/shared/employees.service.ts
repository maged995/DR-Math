import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  employeesForm:FormGroup=this.fb.group({
    EmployeeId:["0"],
    EmployeeName:["",Validators.required],
    EmployeeAge:["",[Validators.required,Validators.min(10)]],
    JobId:["",Validators.required],
    DeptId:["",Validators.required],
    EmpSalary:["",[Validators.required,Validators.min(0)]],
    EmpPhone:["",[Validators.required,Validators.minLength(6),Validators.maxLength(13)]],
    EmpAddress:[""],
    HireDate:["",Validators.required],
    UserName:["",Validators.required],
    GenderId:["",Validators.required],
    IsActive:[true],
    IsLogIn:[false]
  })

  getAllEmployeesByFlagIdAndDept(EmployeeFlagId,DeptId){
return this.http.get(environment.apiUrl+"Employees/GetByDeptAndFlag?id="+EmployeeFlagId+"&&DeptId="+DeptId);
  }

  getAllEmployeesByFlagId(EmployeeFlagId){
    return this.http.get(environment.apiUrl+"Employees/GetAllByFlag?id="+EmployeeFlagId);
  }

  getOneEmployee(EmployeeId){
return this.http.get(environment.apiUrl+"Employees/byId?id="+EmployeeId);
  }

  postEmployee(body){
    return this.http.post(environment.apiUrl+"Employees",body);

  }

  putEmployee(EmployeeId,body){
    return this.http.put(environment.apiUrl+"Employees/"+EmployeeId,body);
  }

  deleteEmployee(EmployeeId){
    return this.http.delete(environment.apiUrl+"Employees/"+EmployeeId);
  }

  getEmployeesForRegister(){
    return this.http.get(environment.apiUrl+"Employees/GetForRegister")
  }

  getEmployeeByClinic(ClinicId){
    return this.http.get(environment.apiUrl+"Employees/getByClinic?ClinicId="+ClinicId)
  }


}
