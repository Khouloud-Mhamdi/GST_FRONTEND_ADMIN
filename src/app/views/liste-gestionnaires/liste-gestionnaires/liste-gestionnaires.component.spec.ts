import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGestionnairesComponent } from './liste-gestionnaires.component';

describe('ListeGestionnairesComponent', () => {
  let component: ListeGestionnairesComponent;
  let fixture: ComponentFixture<ListeGestionnairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGestionnairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeGestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
