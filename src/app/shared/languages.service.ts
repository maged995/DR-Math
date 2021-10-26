import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http:HttpClient) { }

  getAllLanguages(LanguageFlagId){
    return this.http.get(environment.apiUrl+"Languages/"+LanguageFlagId)
  }
}
