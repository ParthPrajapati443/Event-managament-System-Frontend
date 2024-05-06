import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewEventComponent } from './user-view-event.component';

describe('UserViewEventComponent', () => {
  let component: UserViewEventComponent;
  let fixture: ComponentFixture<UserViewEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserViewEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
