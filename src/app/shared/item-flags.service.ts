import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ItemFlagsService {

  constructor(private http:HttpClient) { }

  getOneItemFlags(ItemFlagId){
    return this.http.get(environment.apiUrl+"ItemFlags/"+ItemFlagId)
  }

  getAllItemFlag(){
    return this.http.get(environment.apiUrl+"ItemFlags")
  }
}
