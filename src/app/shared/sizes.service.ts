import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SizesService {

  constructor(private http:HttpClient) { }

  getAllSizes(){
    return this.http.get(environment.apiUrl+"Sizes")
  }
}
