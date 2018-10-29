import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicsVehicleComponent } from './basics-vehicle.component';

describe('BasicsVehicleComponent', () => {
  let component: BasicsVehicleComponent;
  let fixture: ComponentFixture<BasicsVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicsVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
