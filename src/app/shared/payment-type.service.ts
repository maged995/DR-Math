import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(private http:HttpClient) { }

  getAllPaymentType(){
    return this.http.get(environment.apiUrl+"PaymentTypes")
  }
}
