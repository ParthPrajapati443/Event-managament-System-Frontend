import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDarshboardComponent } from './admin-darshboard.component';

describe('AdminDarshboardComponent', () => {
  let component: AdminDarshboardComponent;
  let fixture: ComponentFixture<AdminDarshboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDarshboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDarshboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
