import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private http:HttpClient) { }

  getAllGovernorates(){
    return this.http.get(environment.apiUrl+"Governorates")
  }
}
