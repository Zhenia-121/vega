import { VehiclesModule } from './vehicles.module';

describe('VehiclesModule', () => {
  let vehiclesModule: VehiclesModule;

  beforeEach(() => {
    vehiclesModule = new VehiclesModule();
  });

  it('should create an instance', () => {
    expect(vehiclesModule).toBeTruthy();
  });
});
