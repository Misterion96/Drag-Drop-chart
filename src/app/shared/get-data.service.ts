import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DailyPlan, dayPlan} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<DailyPlan>('assets/data.json')
  }
}
// <dayPlan>{
//   date: new Date,
//   targetValue : randomInteger(40, 50),
//   presentValue: randomInteger(0, 40)
// }
function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

