import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatTabBody } from '@angular/material';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }

  formReport:FormGroup=this.fb.group({
    FirstDate:["",Validators.required],
    EndDate:["",Validators.required],
    TrainerId:["",Validators.required]
  },{validator:this.compareValidator('FirstDate','EndDate')})

  compareValidator(firstDate,endDate):ValidatorFn{
return (group:FormGroup)=>{
const first=group.controls[firstDate];
const end=group.controls[endDate];
if(first.touched && end.touched)
{
  const isMatch= first.value<=end.value;
  if(!isMatch && first.valid&& end.valid)
  {
    end.setErrors({compareValue:firstDate});
    const message= firstDate+ '>' +endDate;
    return {'compareValue':message}
  }
  if(isMatch  && end.hasError('compareValue'))
  {
    end.setErrors(null);
  }
}
return null;
}
  }

  postAllReport(body){
    return this.http.post(environment.apiUrl+"Reports",body);
  }

  getAllTrainerAccount()
  {
    return this.http.get(environment.apiUrl+"Reports")
  }

}
