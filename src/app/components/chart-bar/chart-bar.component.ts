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

  }

}
