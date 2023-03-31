import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEventsComponent } from './gestion-events.component';

describe('GestionEventsComponent', () => {
  let component: GestionEventsComponent;
  let fixture: ComponentFixture<GestionEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
