import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SchoolTypeService {

  constructor(private http:HttpClient) { }

  getAllSchoolType(SchoolTypeFlag){
return this.http.get(environment.apiUrl+"SchoolTypes/"+SchoolTypeFlag)
  }
}
