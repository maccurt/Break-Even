import { MinimumPaymentCalculation } from './../../shared/minimum-payment-calculation.class';
import { IconService } from 'src/app/icon/icon.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-minimum-payment-calculation',
  templateUrl: './minimum-payment-calculation.component.html',
  styleUrls: ['./minimum-payment-calculation.component.scss']
})
export class MinimumPaymentCalculationComponent {

  @Input() calculation!: MinimumPaymentCalculation;

  constructor(public icons: IconService) {
  }
}
