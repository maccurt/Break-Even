import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicPieChartComponent } from './basic-pie-chart.component';

describe('BasicPieChartComponent', () => {
  let component: BasicPieChartComponent;
  let fixture: ComponentFixture<BasicPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
