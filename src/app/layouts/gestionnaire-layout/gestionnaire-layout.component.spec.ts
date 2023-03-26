import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireLayoutComponent } from './gestionnaire-layout.component';

describe('GestionnaireLayoutComponent', () => {
  let component: GestionnaireLayoutComponent;
  let fixture: ComponentFixture<GestionnaireLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionnaireLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
