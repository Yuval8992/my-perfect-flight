import { Injectable } from '@angular/core';
import { FlightListService } from './../../flight-list/flight-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private flightListService: FlightListService) { }
  from: string = '';
  to: string = '';
  fromDate: Date = this.flightListService.dateToKey(new Date());
  toDate: Date = this.flightListService.dateToKey(new Date());
  stops: number = 0;
}
