import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutEntraineurComponent } from './ajout-entraineur.component';

describe('AjoutEntraineurComponent', () => {
  let component: AjoutEntraineurComponent;
  let fixture: ComponentFixture<AjoutEntraineurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutEntraineurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutEntraineurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
