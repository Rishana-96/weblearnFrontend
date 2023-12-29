import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVideoComponent } from './single-video.component';

describe('SingleVideoComponent', () => {
  let component: SingleVideoComponent;
  let fixture: ComponentFixture<SingleVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleVideoComponent]
    });
    fixture = TestBed.createComponent(SingleVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
