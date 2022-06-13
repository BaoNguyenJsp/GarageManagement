import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantDropdownComponent } from './constant-dropdown.component';

describe('ConstantDropdownComponent', () => {
  let component: ConstantDropdownComponent;
  let fixture: ComponentFixture<ConstantDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstantDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
