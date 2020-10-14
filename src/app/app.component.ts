import { Component, OnInit } from '@angular/core';
import { FlightListService } from './flight-list/flight-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private flightListService: FlightListService) { }
  ngOnInit(): void {
    this.flightListService.flightsMapInit();
  }
}
