import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordLayoutComponent } from './forget-password-layout.component';

describe('ForgetPasswordLayoutComponent', () => {
  let component: ForgetPasswordLayoutComponent;
  let fixture: ComponentFixture<ForgetPasswordLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
