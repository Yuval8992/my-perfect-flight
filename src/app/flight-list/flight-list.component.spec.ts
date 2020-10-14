import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListComponent } from './flight-list.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AppMaterialModule } from '../app-material.module';

let flights = [
  {
    flight: [
      {
        flightID: 0,
        airplaneID: 'SC100',
        from: 'tel aviv',
        to: 'lisbon',
        departureDate: new Date(2020, 10, 2, 7, 3, 1),
        arrivalDate: new Date(2020, 10, 2, 12, 5, 0),
        price: [220, 413, 630]
      }]
    , prices: [200, 300, 400]
  },
  {
    flight: [
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
        airplaneID: 'SC101',
        from: 'madrid',
        to: 'lisbon',
        departureDate: new Date(2020, 10, 2, 18, 5),
        arrivalDate: new Date(2020, 10, 2, 18, 55),
        price: [200, 390, 595],
      }]
    , prices: [195, 341, 620]
  },
  {
    flight: [
      {
        flightID: 1,
        airplaneID: 'SC102',
        from: 'tel aviv',
        to: 'paris',
        departureDate: new Date(2020, 10, 2, 19),
        arrivalDate: new Date(2020, 10, 2, 20),
        price: [302, 580, 700]

      },
      {
        flightID: 2,
        airplaneID: 'SC102',
        from: 'paris',
        to: 'lisbon',
        departureDate: new Date(2020, 10, 2, 20, 30),
        arrivalDate: new Date(2020, 10, 2, 21, 10),
        price: [302, 580, 730]
      }],
    prices: [272, 500, 701]
  }];

describe('FlightListComponent', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightListComponent],
      imports: [AppRoutingModule, AppMaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.flights = flights;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort by connections', () => {
    component.sortByConnections();
    expect(component.flights[0]['flight'].length).toEqual(1);
    expect(component.flights[1]['flight'].length).toEqual(2);
    expect(component.flights[2]['flight'].length).toEqual(3);
  });

  it('should sort by duration', () => {
    component.sortByDuration();
    expect(component.flights[0]['flight'].length).toEqual(2);
    expect(component.flights[1]['flight'].length).toEqual(3);
    expect(component.flights[2]['flight'].length).toEqual(1);
  });

  it('should format date', () => {
    expect(component.formatDate(new Date(2020, 4, 3))).toEqual('03/05/2020');
  })

  it('should find max and min price for slider filter', () => {
    component.calcMaxMinPrice();
    expect(component.minPrice).toEqual(195);
    expect(component.maxPrice).toEqual(272);
  })
});
