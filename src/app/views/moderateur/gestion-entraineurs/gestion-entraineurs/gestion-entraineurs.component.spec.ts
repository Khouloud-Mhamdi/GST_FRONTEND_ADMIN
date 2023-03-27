import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEntraineursComponent } from './gestion-entraineurs.component';

describe('GestionEntraineursComponent', () => {
  let component: GestionEntraineursComponent;
  let fixture: ComponentFixture<GestionEntraineursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEntraineursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEntraineursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
