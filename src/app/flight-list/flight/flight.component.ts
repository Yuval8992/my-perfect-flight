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
  departureHour: string;
  landingHour: string;
  departureDate: string;
  landingDate: string;
  stops: number;
  duration: number;
  selectedPrice: number;
  ticketTypes = ['ECONOMY', 'PREMIUM', 'BUSINESS'];
  constructor(private flightListService: FlightListService) { }

  ngOnInit(): void {
    this.formatTime();
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

  formatTime() {
    this.departureHour = this.formatHour(this.flightPath[0].departureDate);
    this.landingHour = this.formatHour(
      this.flightPath[this.flightPath.length - 1].arrivalDate
    );
    this.departureDate = this.formatDate(this.flightPath[0].departureDate);
    this.landingDate = this.formatDate(
      this.flightPath[this.flightPath.length - 1].arrivalDate
    );
  }

  formatHour(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${this.pad(hours)}:${this.pad(minutes)}`;
  }

  formatDate(date: Date) {
    return `${this.pad(date.getDate())}/${this.pad(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  }

  pad(val) {
    let valString = val + '';
    return valString.length < 2 ? '0' + valString : valString;
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

  formatDuration() {
    let stops;
    if (this.stops === 0) {
      stops = 'Non-stop';
    } else if (this.stops === 1) {
      stops = '1 stop';
    } else {
      stops = `${this.stops} stops`;
    }

    return `${stops} | ${Math.floor(this.duration / 60)}h ${this.duration % 60
      }m`;
  }
}
