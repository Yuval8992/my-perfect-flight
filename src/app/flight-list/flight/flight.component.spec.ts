import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FlightComponent } from './flight.component';
import { AppMaterialModule } from '../../app-material.module';
import { AppModule } from '../../app.module';

describe('FlightComponent', () => {
  let component: FlightComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightComponent, TestComponentWrapper],
      imports: [AppMaterialModule, AppModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format hour', () => {
    expect(component.formatHour(new Date(2020, 10, 2, 21, 3))).toEqual('21:03')
  });

  it('should format hour', () => {
    expect(component.formatHour(new Date(2020, 10, 2, 8, 10))).toEqual('08:10')
  });

  it('should format date', () => {
    expect(component.formatDate(new Date(2020, 10, 2, 8, 10))).toEqual('02/11/2020')
  });

  it('should calculate duration in minutes', () => {
    expect(component.calcDuration()).toEqual(141)
  });

  it('should format duration', () => {
    expect(component.formatDuration()).toEqual('2 stops | 2h 21m')
  });
});


@Component({
  selector: 'test-component-wrapper',
  template: '<app-flight [flightPath]="flights" [prices]="prices"></app-flight>'
})
class TestComponentWrapper {
  flights = [
    {
      flightID: 3,
      airplaneID: 'SC101',
      from: 'tel aviv',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 16, 34),
      arrivalDate: new Date(2020, 10, 2, 17, 12),
      price: [200, 390, 595]
    },
    {
      flightID: 4,
      airplaneID: 'SC102',
      from: 'paris',
      to: 'madrid',
      departureDate: new Date(2020, 10, 2, 17, 15),
      arrivalDate: new Date(2020, 10, 2, 17, 50),
      price: [302, 580, 730],
    },
    {
      flightID: 5,
      airplaneID: 'SC103',
      from: 'madrid',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 2, 18, 5),
      arrivalDate: new Date(2020, 10, 2, 18, 55),
      price: [200, 390, 595],
    }];

  prices = [195, 341, 620];
}