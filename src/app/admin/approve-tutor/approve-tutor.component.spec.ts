import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTutorComponent } from './approve-tutor.component';

describe('ApproveTutorComponent', () => {
  let component: ApproveTutorComponent;
  let fixture: ComponentFixture<ApproveTutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveTutorComponent]
    });
    fixture = TestBed.createComponent(ApproveTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
