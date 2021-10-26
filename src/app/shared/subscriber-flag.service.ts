import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SubscriberFlagService {

  constructor(private http:HttpClient) { }

  getAllSubscriberFlag(){
    return this.http.get(environment.apiUrl+"SubscriberFlags")
  }
}
