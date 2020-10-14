import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlightListService } from 'src/app/flight-list/flight-list.service';
import { UserDataService } from './user-data.service';
import { Router } from '@angular/router';

import { CityValidator } from './city-validator';
import { FromDateValidator } from './from-date-validator';
import { ToDateValidator } from './to-date-validator';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  flightForm: FormGroup;
  @Input() errorOn: (arg) => void;
  @Input() overlay;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightListService: FlightListService,
    private userDataService: UserDataService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.flightForm = this.fb.group(
      {
        from: [this.userDataService.from, [Validators.required]],
        to: [this.userDataService.to, [Validators.required]],
        fromDate: [this.userDataService.fromDate, [Validators.required]],
        toDate: [this.userDataService.toDate, [Validators.required]],
        stops: [
          this.userDataService.stops,
          [Validators.required, Validators.min(0), Validators.max(3)],
        ],
      },
      {
        validator: [
          CityValidator.checkCity,
          FromDateValidator.checkDate,
          ToDateValidator.checkDate,
        ],
      }
    );
  }

  hasError(controlName: string, errorName: string) {
    return this.flightForm.controls[controlName].hasError(errorName);
  }

  onSubmit(values) {
    values.from = values.from.toLowerCase();
    values.to = values.to.toLowerCase();

    if (!this.flightListService.cities.includes(values.from)) {
      alert(`Sorry, we do not fly from ${values.from}...`);
      return;
    }
    if (!this.flightListService.cities.includes(values.to)) {
      alert(`Sorry, we do not fly to ${values.to}...`);
      return;
    }

    for (const key in values) {
      this.userDataService[key] = values[key];
    }

    let flights = this.flightListService.getFlights(
      values.from,
      values.to,
      this.flightListService.dateToKey(values.fromDate),
      this.flightListService.dateToKey(values.toDate),
      values.stops
    );

    if (flights.length === 0) {
      this.errorOn(this.overlay);
      return;
    }

    this.router.navigate(['/flights'], {
      queryParams: {
        from: values.from,
        to: values.to,
        fromDate: values.fromDate,
        toDate: values.toDate,
        stops: values.stops,
      },
    });
  }
}
