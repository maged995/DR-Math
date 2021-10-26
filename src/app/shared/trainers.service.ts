import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {


  constructor(private http:HttpClient,private fb:FormBuilder) { }

  trainerForm:FormGroup=this.fb.group({
    TrainerId:[""],
    TrainerName:["",[Validators.required,Validators.pattern('[\u0600-\u06FF]+[\u0600-\u06FF ]+[\u0600-\u06FF]')]],
    TrainerNameEn:["",[Validators.required,Validators.pattern('[a-zA-Z]+[a-zA-Z ]+[a-zA-Z]')]],
    TrainerPhone:["",Validators.required],
    GovernorateId:["",Validators.required],
    Town:["",Validators.required],
    Villige:["",Validators.required],
    GenderId:["",Validators.required],
    IsActive:[""],
    TrainerFlag:["",Validators.required],
    IsLogIn:[false,Validators.required]
  })

  getAllTrainers(TrainerFlag){
    return this.http.get(environment.apiUrl+"Trainers/ByTrainerFlag?TrainerFlag="+TrainerFlag)
  }

  getOneTrainer(TrainerId){
    return this.http.get(environment.apiUrl+"Trainers/ById?id="+TrainerId)
  }

  postTrainer(body){
    return this.http.post(environment.apiUrl+"Trainers/",body)
  }

  putTrainer(TrainerId,body){
    return this.http.put(environment.apiUrl+"Trainers/"+TrainerId,body)
  }

  deleteTrainer(TrainerId){
    return this.http.delete(environment.apiUrl+"Trainers/"+TrainerId)
  }

  GetForRegister(){
    return this.http.get(environment.apiUrl+"Trainers/GetForRegister")
  }
}
