import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GendersService {

  constructor(private http:HttpClient) { }

  getAllGenders(){
    return this.http.get(environment.apiUrl+"Genders")
  }
}
