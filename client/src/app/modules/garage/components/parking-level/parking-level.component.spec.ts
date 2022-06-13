import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLevelComponent } from './parking-level.component';

describe('ParkingLevelComponent', () => {
  let component: ParkingLevelComponent;
  let fixture: ComponentFixture<ParkingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
