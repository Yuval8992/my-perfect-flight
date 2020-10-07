import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSearchContainerComponent } from './flight-search-container.component';

describe('SearchFlightContainerComponent', () => {
  let component: FlightSearchContainerComponent;
  let fixture: ComponentFixture<FlightSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
