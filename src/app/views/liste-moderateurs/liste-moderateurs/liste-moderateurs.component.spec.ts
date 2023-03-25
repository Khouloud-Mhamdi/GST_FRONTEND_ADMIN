import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModerateursComponent } from './liste-moderateurs.component';

describe('ListeModerateursComponent', () => {
  let component: ListeModerateursComponent;
  let fixture: ComponentFixture<ListeModerateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeModerateursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeModerateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
