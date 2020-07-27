import {NgModule} from "@angular/core";
import {ChartBarComponent} from "./chart-bar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { RangeSelectionDirective } from './shared/range-selection.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ChartBarComponent
  ],
  declarations: [
    ChartBarComponent,
    RangeSelectionDirective,
  ]
})

export class ChartBarModule {}
