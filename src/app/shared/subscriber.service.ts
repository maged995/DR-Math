import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
subscribeDegreeForm:FormGroup=this.fb.group({
  SubscriberId:[""],
  EstimateId:[""]
})

subscriberAdd:FormGroup=this.fb.group({
  SubscriberId:["",Validators.required],
  LevelId:["",Validators.required]
})
  subscriberForm:FormGroup=this.fb.group({
    SubscriberId:[""],
    SubscriberCode:[""],
    SubscriberDate:[""],
    SubscriberNameAr:["",[Validators.required,Validators.pattern('[\u0600-\u06FF]+[\u0600-\u06FF ]+[\u0600-\u06FF]')]],
    SubscriberNameEn:["",[Validators.required,Validators.pattern('[a-zA-Z]+[a-zA-Z ]+[a-zA-Z]')]],
    SubscriberFlagId:["",Validators.required],
    SubscriberPhone:["",[Validators.required,Validators.pattern("[0-9]{11}")]],
    LanguageId:["",Validators.required],
    GovernorateId:["",Validators.required],
    Town:["",Validators.required],
    Village:["",Validators.required],
    BirthDate:[""],
    GenderId:[""],
    LevelId:[""],
    latitude:[""],
    Longitude:[""],
    SchoolTypeId:[""],
    SubscriberNumber:[""],
    SubscriberTeacherName:[""],
    SubscriberIdFrom:[""],
    SubscriberFlag:[""],
    SubscriberIsActive:[true],
    Path:[""]
  })

getSubscriberAdd(){
  return this.http.get(environment.apiUrl+"Subscribers/getClosedAndFinish")
}


  getFinishedForTrainer(){
    return this.http.get(environment.apiUrl+"Subscribers/getFinishedForTrainer")

  }
  getFinished(){
    return this.http.get(environment.apiUrl+"Subscribers/getFinished")
  }

  getOneFinished(SubscriberLevelId){
    return this.http.get(environment.apiUrl+"Subscribers/getSubscribedFinishedById?SubscriberLevelId="+SubscriberLevelId)
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          console.log("error")
          console.log(err)
          reject(err);
        });
    });

  }

  getOneSubscriber(SubscriberId){
    return this.http.get(environment.apiUrl+"Subscribers/getOne?id="+SubscriberId)
  }

  getOneCardSubscriber(SubscriberId){
    
    return this.http.get(environment.apiUrl+"Subscribers/getOneCard?id="+SubscriberId)

  }
  getOnePathSubscriber(SubscriberId){
    return this.http.get(environment.apiUrl+"Subscribers/getPathOne?id="+SubscriberId, { responseType: 'blob' })

  }

  getAllSubsciberForTrainerByFlag(SubscriberFlagId){
    return this.http.get(environment.apiUrl+"Subscribers/bySubscriberfLagForTrainer?SubscriberFlagId="+SubscriberFlagId)
  }

  postSubscriber(body){
    return this.http.post(environment.apiUrl+"Subscribers/subscribers",body)
  }

  postSubscriberLevel(body){
    return this.http.post(environment.apiUrl+"Subscribers/AddSubscriberLevel",body)
  }

  postStudent(body){
    return this.http.post(environment.apiUrl+"Subscribers/students",body)

  }

  postEstimateStudent(body){
return this.http.post(environment.apiUrl+"Subscribers/EstimateStuent",body)
  }

  putStudent(body){
    return this.http.put(environment.apiUrl+"Subscribers/students",body)

  }

  
    putSubscriber(SubscriberId,body){
      return this.http.put(environment.apiUrl+"Subscribers/putSubscribers?id="+SubscriberId,body);
    }

  deleteSubscriber(SubscriberId){
    
    return this.http.delete(environment.apiUrl+"Subscribers/deleteSubscriber?id="+SubscriberId)

  }

  closeSubscriber(SubscriberId){
return this.http.delete(environment.apiUrl+"Subscribers/AbsenceSubscriber?id="+SubscriberId)
  }

  ToPosition(SubscriberId,latitude,longitude){
return this.http.delete(environment.apiUrl+"Subscribers/EditPosition?id="+SubscriberId +"&&latitude="+latitude+"&&longitude="+longitude)
}

getSubscrbersForTrainer(){
  return this.http.get(environment.apiUrl+"Subscribers/ForTrainer")
}

getSubcribersForCountry(){
  return this.http.get(environment.apiUrl+"Subscribers/ForCountry")

}

getSubscribersForAdmin(){
  return this.http.get(environment.apiUrl+"Subscribers/ForAdmin")
}

getSubscribersForAdminByTrainer(TrainerId){
  
  return this.http.get(environment.apiUrl+"Subscribers/ForAdminByTrainer?TrainerId="+TrainerId)

}
  
}
