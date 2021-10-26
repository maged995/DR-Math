import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LevelsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }


  levelForm:FormGroup=this.fb.group({
    LevelId:[""],
    LevelDesc:["",Validators.required],
    LevelEng:["",Validators.required],
    LevelNo:["",Validators.required],
    LevelIsActive:["",Validators.required],
   
  })

  getAlllevels(){
    return this.http.get(environment.apiUrl+"Levels")
  }

  getOneLevel(LevelId){
    return this.http.get(environment.apiUrl+"Levels/byId?LevelId="+LevelId)
  }

  postLevel(body){
return this.http.post(environment.apiUrl+"Levels",body)
  }

  putLevel(LevelId,body){
    return this.http.put(environment.apiUrl+"Levels/"+LevelId,body)
  }

  deletelevel(LevelId){
    return this.http.delete(environment.apiUrl+"Levels/"+LevelId)
  }
}
