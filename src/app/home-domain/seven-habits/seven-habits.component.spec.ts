import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenHabitsComponent } from './seven-habits.component';

describe('SevenHabitsComponent', () => {
  let component: SevenHabitsComponent;
  let fixture: ComponentFixture<SevenHabitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SevenHabitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SevenHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
