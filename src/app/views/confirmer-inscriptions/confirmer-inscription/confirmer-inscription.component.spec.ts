import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerInscriptionComponent } from './confirmer-inscription.component';

describe('ConfirmerInscriptionComponent', () => {
  let component: ConfirmerInscriptionComponent;
  let fixture: ComponentFixture<ConfirmerInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmerInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmerInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
