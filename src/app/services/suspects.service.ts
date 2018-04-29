import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { suspect } from '../models/suspect.model';

@Injectable()
export class SuspectsService {

  constructor(private http:HttpClient) { }
  getAllSuspects()
  {
    let url = "http://localhost:8081/aml/api/v1/suspectedObject";
   return this.http.get<suspect[]>(url);
  }
  forwardSuspect(){
    
  }

}
