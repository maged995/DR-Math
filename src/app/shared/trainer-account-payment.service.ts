import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TrainerAccountPaymentService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  trainerPaymentForm:FormGroup=this.fb.group({
    TrainerAccountPaymentId:["0"],
    TrainerId:["",Validators.required],
    PaymentTypeId:["",Validators.required],
    PaymentValue:["",[Validators.required,Validators.pattern('[0-9]*'),Validators.min(1)]]
  })

  getAllPayment(){
    return this.http.get(environment.apiUrl+"TrainerAccountPayments")
  }

  postPayment(body){
    return this.http.post(environment.apiUrl+"TrainerAccountPayments",body)

  }

  getOneReportForTrainer(TrainerAccountPaymentId){
    return this.http.get(environment.apiUrl+"TrainerAccountPayments/forTrainer?id="+TrainerAccountPaymentId)
  }

  
  getOneReportForAdmin(TrainerAccountPaymentId){
    return this.http.get(environment.apiUrl+"TrainerAccountPayments/forAdmin?id="+TrainerAccountPaymentId)
  }
}
