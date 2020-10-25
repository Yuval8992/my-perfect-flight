import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlightListService } from '../flight-list.service';
import { Flight } from './flight.model';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  @Input() flightPath: Flight[];
  @Input() prices: number[];
  departureDate: Date;
  landingDate: Date;
  stops: number;
  duration: number;
  selectedPrice: number;
  ticketTypes = ['ECONOMY', 'PREMIUM', 'BUSINESS'];
  constructor(private flightListService: FlightListService) { }

  ngOnInit(): void {
    this.getDates();
    this.stops = this.getStops();
    this.duration = this.calcDuration();
    this.selectedPrice = this.prices[0];
  }

  findAirportsCities(city: string) {
    const idx = this.flightListService.cities.findIndex(
      (cityEl) => cityEl === city
    );
    return this.flightListService.airportsCities[idx];
  }

  getDates() {
    this.departureDate = this.flightPath[0].departureDate;
    this.landingDate = this.flightPath[this.flightPath.length - 1].arrivalDate;
  }

  getStops() {
    return this.flightPath.length - 1;
  }

  calcDuration() {
    let diffInMinutes =
      (this.flightPath[this.flightPath.length - 1].arrivalDate.getTime() -
        this.flightPath[0].departureDate.getTime()) /
      1000 /
      60;

    return Math.round(diffInMinutes);
  }
}
