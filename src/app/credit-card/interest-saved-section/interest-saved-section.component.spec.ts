import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestSavedSectionComponent } from './interest-saved-section.component';

describe('InterestSavedSectionComponent', () => {
  let component: InterestSavedSectionComponent;
  let fixture: ComponentFixture<InterestSavedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestSavedSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterestSavedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
