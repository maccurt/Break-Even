import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumPaymentCalculationComponent } from './minimum-payment-calculation.component';

describe('MinimumPaymentCalculationComponent', () => {
  let component: MinimumPaymentCalculationComponent;
  let fixture: ComponentFixture<MinimumPaymentCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimumPaymentCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinimumPaymentCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
