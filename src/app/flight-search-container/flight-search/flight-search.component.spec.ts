import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { AppMaterialModule } from '../../app-material.module';
import { FlightSearchComponent } from './flight-search.component';
import { FlightListService } from '../../flight-list/flight-list.service'
import { AppComponent } from 'src/app/app.component';

describe('form validation', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightSearchComponent, AppComponent],
      providers: [FlightListService],
      imports: [FormsModule, ReactiveFormsModule, AppRoutingModule, AppMaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid, all field required', () => {
    expect(component.flightForm.valid).toBeFalsy();
  })

  it('form should be invalid, to and from fields should be different', () => {
    component.flightForm.controls['from'].setValue('tel aviv');
    component.flightForm.controls['to'].markAsTouched();
    component.flightForm.controls['to'].setValue('tel aviv');

    component.flightForm.controls['fromDate'].setValue(new Date(2020, 10, 1));
    component.flightForm.controls['toDate'].setValue(new Date(2020, 10, 10));
    component.flightForm.controls['stops'].setValue(2);

    expect(component.flightForm.valid).toBeFalsy();
  })

  it('form should be invalid, fromDate cannot be in the past', () => {
    component.flightForm.controls['from'].setValue('tel aviv');
    component.flightForm.controls['to'].setValue('lisbon');

    component.flightForm.controls['fromDate'].markAsTouched();
    component.flightForm.controls['fromDate'].setValue(new Date(2019, 10, 1));
    component.flightForm.controls['toDate'].setValue(new Date(2020, 10, 10));
    component.flightForm.controls['stops'].setValue(2);

    expect(component.flightForm.valid).toBeFalsy();
  })

  it('form should be invalid, toDate should be after fromDate', () => {
    component.flightForm.controls['from'].setValue('tel aviv');
    component.flightForm.controls['to'].setValue('lisbon');

    component.flightForm.controls['fromDate'].setValue(new Date(2020, 10, 1));
    component.flightForm.controls['toDate'].setValue(new Date(2020, 9, 1));
    component.flightForm.controls['toDate'].markAsTouched();
    component.flightForm.controls['stops'].setValue(2);

    expect(component.flightForm.valid).toBeFalsy();
  })

  it('form should be invalid, stops should be between 0-3', () => {
    component.flightForm.controls['from'].setValue('tel aviv');
    component.flightForm.controls['to'].setValue('lisbon');
    component.flightForm.controls['fromDate'].setValue(new Date(2020, 10, 1));
    component.flightForm.controls['toDate'].setValue(new Date(2020, 9, 1));
    component.flightForm.controls['stops'].setValue(4);

    expect(component.flightForm.valid).toBeFalsy();
  })

});
