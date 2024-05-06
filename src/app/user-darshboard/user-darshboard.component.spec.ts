import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDarshboardComponent } from './user-darshboard.component';

describe('UserDarshboardComponent', () => {
  let component: UserDarshboardComponent;
  let fixture: ComponentFixture<UserDarshboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDarshboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDarshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
