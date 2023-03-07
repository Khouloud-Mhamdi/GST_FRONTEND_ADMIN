import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAjoutComponent } from './form-ajout.component';

describe('FormAjoutComponent', () => {
  let component: FormAjoutComponent;
  let fixture: ComponentFixture<FormAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAjoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
