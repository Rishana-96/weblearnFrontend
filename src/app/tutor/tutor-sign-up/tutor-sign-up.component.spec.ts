import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSignUpComponent } from './tutor-sign-up.component';

describe('TutorSignUpComponent', () => {
  let component: TutorSignUpComponent;
  let fixture: ComponentFixture<TutorSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutorSignUpComponent]
    });
    fixture = TestBed.createComponent(TutorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
