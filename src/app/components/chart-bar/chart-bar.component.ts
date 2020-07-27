import {Component, OnInit} from '@angular/core';
import {GetDataService} from "../../shared/get-data.service";
import {DailyPlan} from "../../interfaces/interfaces";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.styl']
})
export class ChartBarComponent implements OnInit {
  data: DailyPlan = {
    maxValue: 1,
    minValue: 1,
    midValue: 0,
    targetName: "Имя",
    presentName: "Имя",
    days: [{
      date: new Date(),
      targetValue: 1,
      presentValue: 1,
    }]
  }

  constructor(private getDataService: GetDataService) {
  }

  ngOnInit(): void {
    this.getDataService.getData()
      .then(res => {
        res.days.map(day => {
          day.target = (82 * day.targetValue / res.maxValue).toFixed(0)
          day.present = (82 * day.presentValue / day.targetValue).toFixed(0)
        })
        this.data = res
      })
      setInterval(()=>{
        const t = randomInteger(40, 50);
        const p = randomInteger(0, 40);
        this.data.days.push({
          date: new Date(),
          targetValue: t,
          presentValue: p,
          target: (82 * t / this.data.maxValue).toFixed(0),
          present: (82 * p / t).toFixed(0)
        })
      }, 2000)
  }

}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
