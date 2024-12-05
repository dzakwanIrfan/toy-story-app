import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RacesPage } from './races.page';

describe('RacesPage', () => {
  let component: RacesPage;
  let fixture: ComponentFixture<RacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
