import { TestBed } from '@angular/core/testing';

import { CreditCardChartService } from './credit-card-chart.service';

describe('CreditCardChartService', () => {
  let service: CreditCardChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
