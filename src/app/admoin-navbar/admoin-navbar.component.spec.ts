import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmoinNavbarComponent } from './admoin-navbar.component';

describe('AdmoinNavbarComponent', () => {
  let component: AdmoinNavbarComponent;
  let fixture: ComponentFixture<AdmoinNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmoinNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmoinNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
