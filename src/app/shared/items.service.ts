import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient,private fb:FormBuilder) { }
itemForm:FormGroup=this.fb.group({
  ItemId:[""],
  ItemFlagId:["",Validators.required],
  ItemSellPrice:["",Validators.required],
 // ItemBuyPrice:["",Validators.required],
  LevelId:[""],
  SizeId:[""],
  ItemDesc:[""],
  LanguageId:[""],
  SizeNo:[""],
  ItemIsActive:[""]
})


  getAllItemByFlag(ItemFlagId){
return this.http.get(environment.apiUrl+"Items/byItemFlag?ItemFlagId="+ItemFlagId);
  }

  getOneItem(ItemId){
    return this.http.get(environment.apiUrl+"Items/byItemId?ItemId="+ItemId)
  }

  postItem(body){
    return this.http.post(environment.apiUrl+"Items/",body);
  }

  putItem(ItemId,body){
return this.http.put(environment.apiUrl+"Items/"+ItemId,body)
  }

  deleteItem(ItemId){
    return this.http.delete(environment.apiUrl+"Items/"+ItemId);
  }
}
