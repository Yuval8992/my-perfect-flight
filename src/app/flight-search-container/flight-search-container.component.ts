import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-flight-search-container',
  templateUrl: './flight-search-container.component.html',
  styleUrls: ['./flight-search-container.component.css'],
})
export class FlightSearchContainerComponent implements OnInit {
  @ViewChild('overlay') overlay;
  display = 'none';
  constructor() {}

  ngOnInit(): void {}

  errorOff(overlay) {
    overlay.style.display = 'none';
  }

  errorOn = (overlay) => {
    overlay.style.display = 'block';
  };
}
