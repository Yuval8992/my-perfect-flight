import { Injectable } from '@angular/core';
import { Flight } from './flight/flight.model';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const MAX_CONNECTION_HOURS = 24;
const MIN_HOURS_BETWEEN_FLIGHTS = 2;

@Injectable({
  providedIn: 'root',
})
export class FlightListService {
  cities: string[] = ['tel aviv', 'lisbon', 'paris', 'madrid'];
  airportsCities: string[] = ['TLV', 'LIS', 'CDG', 'MAD'];
  flightSearchResults: Array<Flight[]> = null;

  flightsMap = new Map();
  allFlights: Flight[] = [
    {
      flightID: 0,
      airplaneID: 'SC100',
      from: 'tel aviv',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 2, 7, 3, 1),
      arrivalDate: new Date(2020, 10, 2, 9, 5, 0),
      price: [220, 413, 630],
    },
    {
      flightID: 1,
      airplaneID: 'SC101',
      from: 'tel aviv',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 2, 16, 34),
      arrivalDate: new Date(2020, 10, 2, 18, 36),
      price: [200, 390, 595],
    },
    {
      flightID: 2,
      airplaneID: 'SC102',
      from: 'tel aviv',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 19),
      arrivalDate: new Date(2020, 10, 2, 22),
      price: [302, 580, 730],
    },
    {
      flightID: 3,
      airplaneID: 'SC103',
      from: 'tel aviv',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 13, 43),
      arrivalDate: new Date(2020, 10, 2, 16, 50),
      price: [292, 540, 712],
    },
    {
      flightID: 4,
      airplaneID: 'SC104',
      from: 'tel aviv',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 11, 44),
      arrivalDate: new Date(2020, 10, 2, 14, 42),
      price: [360, 612, 801],
    },
    {
      flightID: 5,
      airplaneID: 'SC105',
      from: 'paris',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 2, 17),
      arrivalDate: new Date(2020, 10, 2, 20),
      price: [180, 325, 555],
    },
    {
      flightID: 6,
      airplaneID: 'SC106',
      from: 'tel aviv',
      to: 'madrid',
      departureDate: new Date(2020, 10, 2, 18, 3),
      arrivalDate: new Date(2020, 10, 2, 23, 10),
      price: [412, 651, 830],
    },
    {
      flightID: 7,
      airplaneID: 'SC107',
      from: 'lisbon',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 20, 1),
      arrivalDate: new Date(2020, 10, 2, 22, 2),
      price: [214, 389, 571],
    },
    {
      flightID: 8,
      airplaneID: 'SC108',
      from: 'paris',
      to: 'madrid',
      departureDate: new Date(2020, 10, 3, 2),
      arrivalDate: new Date(2020, 10, 3, 7),
      price: [273, 311, 570],
    },
    {
      flightID: 9,
      airplaneID: 'SC109',
      from: 'paris',
      to: 'madrid',
      departureDate: new Date(2020, 10, 4, 0, 46),
      arrivalDate: new Date(2020, 10, 4, 5, 54),
      price: [290, 340, 601],
    },
    {
      flightID: 10,
      airplaneID: 'SC110',
      from: 'tel aviv',
      to: 'paris',
      departureDate: new Date(2020, 10, 2, 2, 46),
      arrivalDate: new Date(2020, 10, 2, 2, 47),
      price: [294, 341, 611],
    },
    {
      flightID: 11,
      airplaneID: 'SC111',
      from: 'paris',
      to: 'madrid',
      departureDate: new Date(2020, 10, 2, 4, 50),
      arrivalDate: new Date(2020, 10, 2, 4, 55),
      price: [294, 341, 611],
    },
    {
      flightID: 12,
      airplaneID: 'SC112',
      from: 'madrid',
      to: 'paris',
      departureDate: new Date(2020, 10, 7, 4, 50),
      arrivalDate: new Date(2020, 10, 7, 9, 55),
      price: [300, 480, 620],
    },
    {
      flightID: 13,
      airplaneID: 'SC113',
      from: 'lisbon',
      to: 'paris',
      departureDate: new Date(2020, 10, 9, 23, 50),
      arrivalDate: new Date(2020, 10, 10, 4, 1),
      price: [294, 341, 611],
    },
    {
      flightID: 14,
      airplaneID: 'SC114',
      from: 'lisbon',
      to: 'tel aviv',
      departureDate: new Date(2020, 10, 8, 17, 50),
      arrivalDate: new Date(2020, 10, 8, 22, 3),
      price: [294, 341, 611],
    },
    {
      flightID: 15,
      airplaneID: 'SC115',
      from: 'madrid',
      to: 'tel aviv',
      departureDate: new Date(2020, 10, 6, 4, 0),
      arrivalDate: new Date(2020, 10, 6, 9, 23),
      price: [294, 341, 611],
    },
    {
      flightID: 16,
      airplaneID: 'SC116',
      from: 'tel aviv',
      to: 'madrid',
      departureDate: new Date(2020, 10, 3, 22, 22),
      arrivalDate: new Date(2020, 10, 4, 3, 5),
      price: [294, 341, 611],
    },
    {
      flightID: 17,
      airplaneID: 'SC117',
      from: 'paris',
      to: 'tel aviv',
      departureDate: new Date(2020, 10, 6, 12, 1),
      arrivalDate: new Date(2020, 10, 6, 18, 12),
      price: [294, 341, 611],
    },
    {
      flightID: 18,
      airplaneID: 'SC118',
      from: 'lisbon',
      to: 'madrid',
      departureDate: new Date(2020, 10, 8, 7, 34),
      arrivalDate: new Date(2020, 10, 8, 11, 43),
      price: [294, 341, 611],
    },
    {
      flightID: 19,
      airplaneID: 'SC119',
      from: 'madrid',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 9, 6, 50),
      arrivalDate: new Date(2020, 10, 9, 10, 30),
      price: [294, 341, 611],
    },
    {
      flightID: 120,
      airplaneID: 'SC120',
      from: 'madrid',
      to: 'lisbon',
      departureDate: new Date(2020, 10, 7, 5, 42),
      arrivalDate: new Date(2020, 10, 7, 9, 55),
      price: [294, 341, 611],
    },
  ];

  flightsMapInit() {
    this.cities.forEach((city) => {
      this.flightsMap.set(city, new Map());
    });

    this.allFlights.forEach((flight) => {
      const allFlightsByCity = this.flightsMap.get(flight.from);
      const flightDate = this.DateToKey(flight.departureDate).toISOString();

      if (!allFlightsByCity.has(flightDate)) {
        allFlightsByCity.set(flightDate, new Array(flight));
      } else {
        allFlightsByCity.set(flightDate, [
          ...allFlightsByCity.get(flightDate),
          flight,
        ]);
      }
    });
  }

  getFlights(from, to, fromDate, toDate, stops) {
    const result = new Array<Flight[]>();
    const numOfDays = this.dayDifference(fromDate, toDate) + 1;

    for (let i = 0; i < numOfDays; i++) {
      this.getFlightsRec(
        from,
        to,
        fromDate,
        toDate,
        fromDate,
        stops,
        result,
        new Array()
      );
      fromDate = this.setDays(fromDate, 1);
    }
    this.flightSearchResults = result;

    return result;
  }

  getFlightsRec(from, to, fromDate, toDate, arrivalDate, stops, result, path) {
    if (from === to) {
      result.push(path);
      return;
    }

    if (stops < 0) {
      return;
    }

    //Put in array this day and the next day flights (for connection flights)
    const flightsByDates = [
      this.flightsMap.get(from).get(fromDate.toISOString()),
    ];
    //Not relevant for the first flight
    if (path.length > 0) {
      flightsByDates.push(
        this.flightsMap.get(from).get(this.setDays(fromDate, 1).toISOString())
      );
    }

    for (let i = 0; i < flightsByDates.length; i++) {
      if (flightsByDates[i]) {
        flightsByDates[i].forEach((flight) => {
          let pathCopy = [...path];
          if (
            this.flightsScheduleChecking(
              arrivalDate,
              flight.departureDate,
              toDate
            )
          ) {
            pathCopy.push(flight);
            this.getFlightsRec(
              flight.to,
              to,
              this.DateToKey(flight.arrivalDate),
              toDate,
              this.setHours(flight.arrivalDate, MIN_HOURS_BETWEEN_FLIGHTS),
              stops - 1,
              result,
              pathCopy
            );
          }
        });
      }
    }
  }

  //Map key should be like 2020-11-06T00:00:00.000Z
  DateToKey(fullDate) {
    return new Date(
      fullDate.getFullYear(),
      fullDate.getMonth(),
      fullDate.getDate()
    );
  }

  dayDifference(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  flightsScheduleChecking(arrivalDate, departureDate, toDate) {
    return (
      //DepartureDate not after the date defined by user
      departureDate.toISOString() <= toDate.toISOString() &&
      //ArrivalDate (plus 2 hours of boarding and baggage issues) not after the next departureDate flight
      arrivalDate.toISOString() <= departureDate.toISOString() &&
      //Not more than 24 hours of connection
      this.setHours(arrivalDate, MAX_CONNECTION_HOURS).toISOString() >=
        departureDate.toISOString()
    );
  }

  setDays(date, days) {
    let newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + days);

    return newDate;
  }

  setHours(date, hours) {
    let newDate = new Date(date.getTime());
    newDate.setHours(newDate.getHours() + hours);

    return newDate;
  }
}
