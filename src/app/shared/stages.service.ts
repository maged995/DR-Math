import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StagesService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }

  stageForm:FormGroup=this.fb.group({
    StageId:[""],
    StageDesc:["",Validators.required],
    IsActive:[""]

  })

  getAllStages(){
    return this.http.get(environment.apiUrl+"Stages")
  }

  getOneStage(StageId){
return this.http.get(environment.apiUrl+"Stages/"+StageId)
  }

  postStage(body){
return this.http.post(environment.apiUrl+"Stages",body)
  }
  putStage(StageId,body){
    return this.http.put(environment.apiUrl+"Stages/"+StageId,body)
  }

  deleteStage(StageId){
return this.http.delete(environment.apiUrl+"Stages/"+StageId)
  }
}
