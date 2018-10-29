import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesPhotosComponent } from './vehicles-photos.component';

describe('VehiclesPhotosComponent', () => {
  let component: VehiclesPhotosComponent;
  let fixture: ComponentFixture<VehiclesPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclesPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
