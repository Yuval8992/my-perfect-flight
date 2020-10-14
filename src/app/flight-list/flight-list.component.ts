import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FlightListService } from './flight-list.service';
import { Flight } from './flight/flight.model';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
})
export class FlightListComponent implements OnInit {
  flights: Array<{ flight: Flight[]; prices: number[] }> = [];
  from: string;
  to: string;
  fromDate: string;
  toDate: string;
  stops: number;
  maxPrice: number;
  minPrice: number;
  value: number;
  thumbLabel: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private flightListService: FlightListService
  ) { }

  ngOnInit(): void {
    this.getFlights();
    if (this.flights) {
      this.sortByConnections();
      this.calcMaxMinPrice();
      this.fromDate = this.formatDate(new Date(this.fromDate));
      this.toDate = this.formatDate(new Date(this.toDate));
    }
  }

  getFlights() {
    let flights = this.flightListService.flightSearchResults;
    if (!flights) {
      this.router.navigate(['/flight-search']);
      return;
    }
    this.calcPrice(flights);

    const queryParams = this.route.snapshot.queryParams;
    for (const key in queryParams) {
      this[key] = queryParams[key];
    }
  }

  sortByConnections() {
    this.flights.sort(function (a, b) {
      return a['flight'].length - b['flight'].length;
    });
  }

  sortByDuration() {
    this.flights.sort(function (a, b) {
      return (
        Math.round(
          a['flight'][a['flight'].length - 1].arrivalDate.getTime() -
          a['flight'][0].departureDate.getTime()
        ) /
        1000 /
        60 -
        Math.round(
          b['flight'][b['flight'].length - 1].arrivalDate.getTime() -
          b['flight'][0].departureDate.getTime()
        ) /
        1000 /
        60
      );
    });
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

  calcPrice(flights: Array<Flight[]>) {
    flights.forEach((flightPath, i) => {
      let prices = [0, 0, 0];
      flightPath.forEach((flight) => {
        flight.price.forEach((price, i) => {
          prices[i] += price;
        });
      });
      prices.forEach((price, i) => {
        prices[i] = Math.round(
          (price / flightPath.length) *
          this.discountForConnection(flightPath.length)
        );
      });
      this.flights.push({ flight: flightPath, prices: prices });
    });
  }

  discountForConnection(flightLength: number): number {
    switch (flightLength) {
      case 1:
        return 1;
      case 2:
        return 0.9;
      case 3:
        return 0.8;
      case 4:
        return 0.7;
      default:
        1;
    }
  }

  calcMaxMinPrice() {
    const economyPrice = this.flights.map((el) => el['prices'][0]);
    this.maxPrice = Math.max(...economyPrice);
    this.minPrice = Math.min(...economyPrice);
    this.value = this.maxPrice;
  }
}
