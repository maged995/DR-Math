import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstimatesService {

  constructor(private http:HttpClient) { }

  getAllEstimates(){
    return this.http.get(environment.apiUrl+"Estimates")
  }
}
