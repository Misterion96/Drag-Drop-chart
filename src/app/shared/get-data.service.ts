import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DailyPlan} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<DailyPlan>('assets/data.json')
      .toPromise()
      .then(res => res)
  }
}
