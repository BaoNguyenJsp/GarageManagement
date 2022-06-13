import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageManagerComponent } from './garage-manager.component';

describe('GarageManagerComponent', () => {
  let component: GarageManagerComponent;
  let fixture: ComponentFixture<GarageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarageManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
