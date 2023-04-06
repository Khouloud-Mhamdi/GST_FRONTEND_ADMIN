import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationMembresModerateurComponent } from './consultation-membres-moderateur.component';

describe('ConsultationMembresModerateurComponent', () => {
  let component: ConsultationMembresModerateurComponent;
  let fixture: ComponentFixture<ConsultationMembresModerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationMembresModerateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultationMembresModerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
