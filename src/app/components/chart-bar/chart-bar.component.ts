import {Component, OnInit} from '@angular/core';
import {GetDataService} from "../../shared/get-data.service";
import {DailyPlan} from "../../interfaces/interfaces";


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
    this.getDataService.getData().subscribe(res => {
      res.days.map(day => {
        day.target = (80 * day.targetValue / res.maxValue).toFixed(0)
        day.present = (80 * day.presentValue / day.targetValue).toFixed(0)
      })
      this.data = res
    })

  }

}
