import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotificationComponent } from './display-notification.component';

describe('DisplayNotificationComponent', () => {
  let component: DisplayNotificationComponent;
  let fixture: ComponentFixture<DisplayNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
