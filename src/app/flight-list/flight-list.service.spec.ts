import { async, TestBed } from '@angular/core/testing';

import { FlightListService } from './flight-list.service';

describe('tests for flight-list functionality', () => {
    let service: FlightListService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [FlightListService],
        }).compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(FlightListService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get date and return date as a key', () => {
        expect(service.dateToKey(new Date(2020, 4, 1, 1, 2))).toEqual(new Date(2020, 4, 1));
    })

    it('should return difference days between two dates', () => {
        expect(service.dayDifference(new Date(2020, 5, 8), new Date(2020, 5, 4))).toEqual(4);
    })

    it('should return difference days between two dates', () => {
        expect(service.dayDifference(new Date(2020, 5, 8), new Date(2020, 5, 4))).toEqual(4);
    })

    it('should set date with given days', () => {
        expect(service.setDays(new Date(2020, 7, 8), 5)).toEqual(new Date(2020, 7, 13));
    })

    it('should set hours in date with given hours', () => {
        expect(service.setHours(new Date(2020, 7, 8, 1), 5)).toEqual(new Date(2020, 7, 8, 6));
    })

    it('should check if given flight on schedule - departureDate not after the date defined by user', () => {
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3), new Date(2020, 10, 3), new Date(2020, 10, 5))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3), new Date(2020, 10, 4), new Date(2020, 10, 4))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3), new Date(2020, 10, 3), new Date(2020, 10, 3))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3), new Date(2020, 10, 3), new Date(2020, 10, 2))).toBeFalsy();
    })

    it('should check if given flight on schedule - arrivalDate (plus 2 hours of boarding and baggage issues) not after the next departureDate flight', () => {
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 2), new Date(2020, 10, 3, 5), new Date(2020, 10, 6))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 4, 1), new Date(2020, 10, 4), new Date(2020, 10, 6, 1))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 7, 20), new Date(2020, 10, 3), new Date(2020, 10, 6, 9, 19))).toBeFalsy();
    })

    it('should check if given flight on schedule - Not more than 24 hours of connection', () => {
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 2), new Date(2020, 10, 3, 22), new Date(2020, 10, 6))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 4), new Date(2020, 10, 4, 4), new Date(2020, 10, 6, 1))).toBeTruthy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 7), new Date(2020, 10, 4, 8), new Date(2020, 10, 6, 9, 19))).toBeFalsy();
        expect(service.flightsScheduleChecking(new Date(2020, 10, 3, 7, 20), new Date(2020, 10, 4, 7, 21), new Date(2020, 10, 6, 9, 19))).toBeFalsy();
    })

    it('map size should be equal to cities length', () => {
        service.flightsMapInit();
        expect(service.flightsMap.size).toEqual(service.cities.length);
    })

    it('should check number of flights from city by date', () => {
        service.flightsMapInit();

        expect(service.flightsMap.get('tel aviv').get('2020-11-01T22:00:00.000Z').length).toEqual(7);
        expect(service.flightsMap.get('tel aviv').get('2020-11-02T22:00:00.000Z').length).toEqual(1);

        expect(service.flightsMap.get('lisbon').get('2020-11-01T22:00:00.000Z').length).toEqual(1);
        expect(service.flightsMap.get('lisbon').get('2020-11-08T22:00:00.000Z').length).toEqual(1);
        expect(service.flightsMap.get('lisbon').get('2020-11-07T22:00:00.000Z').length).toEqual(2);

        expect(service.flightsMap.get('paris').get('2020-11-01T22:00:00.000Z').length).toEqual(2);
        expect(service.flightsMap.get('paris').get('2020-11-02T22:00:00.000Z').length).toEqual(1);
        expect(service.flightsMap.get('paris').get('2020-11-03T22:00:00.000Z').length).toEqual(1);
        expect(service.flightsMap.get('paris').get('2020-11-05T22:00:00.000Z').length).toEqual(1);

        expect(service.flightsMap.get('madrid').get('2020-11-05T22:00:00.000Z').length).toEqual(1);
        expect(service.flightsMap.get('madrid').get('2020-11-06T22:00:00.000Z').length).toEqual(2);
        expect(service.flightsMap.get('madrid').get('2020-11-08T22:00:00.000Z').length).toEqual(1);

    });

    it('should return the number of flights with 0 stops', () => {
        service.flightsMapInit();
        expect(service.getFlights('tel aviv', 'lisbon', new Date(2020, 10, 1), new Date(2020, 10, 11), 0).length).toEqual(2);
        expect(service.getFlights('paris', 'lisbon', new Date(2020, 10, 1), new Date(2020, 10, 11), 0).length).toEqual(1);
    })

    it('should return the number of flights with 1 stops', () => {
        service.flightsMapInit();
        expect(service.getFlights('madrid', 'tel aviv', new Date(2020, 10, 1), new Date(2020, 10, 11), 1).length).toEqual(1);
        expect(service.getFlights('lisbon', 'tel aviv', new Date(2020, 10, 1), new Date(2020, 10, 11), 1).length).toEqual(1);
    })

    it('should return the number of flights with 2 stops', () => {
        service.flightsMapInit();
        expect(service.getFlights('tel aviv', 'madrid', new Date(2020, 10, 1), new Date(2020, 10, 11), 2).length).toEqual(8);
        expect(service.getFlights('tel aviv', 'lisbon', new Date(2020, 10, 1), new Date(2020, 10, 11), 2).length).toEqual(4);
    })

    it('should return empty array because there are no flights in this date', () => {
        service.flightsMapInit();
        expect(service.getFlights('tel aviv', 'madrid', new Date(2020, 11, 1), new Date(2020, 11, 11), 0).length).toEqual(0);
        expect(service.getFlights('lisbon', 'madrid', new Date(2020, 10, 9), new Date(2020, 10, 11), 1).length).toEqual(0);
        expect(service.getFlights('tel aviv', 'lisbon', new Date(2020, 10, 8), new Date(2020, 10, 9), 2).length).toEqual(0);
    })

})
