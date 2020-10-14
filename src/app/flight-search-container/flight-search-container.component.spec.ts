import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FlightSearchContainerComponent } from './flight-search-container.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';

describe('SearchFlightContainerComponent', () => {
  let component: FlightSearchContainerComponent;
  let fixture: ComponentFixture<FlightSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchContainerComponent, FlightSearchComponent],
      imports: [FormsModule, ReactiveFormsModule, AppRoutingModule, AppMaterialModule]
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
