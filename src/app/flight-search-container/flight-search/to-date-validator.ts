import { AbstractControl } from '@angular/forms';

export class ToDateValidator {
  static checkDate(AC: AbstractControl) {
    if (
      AC.get('toDate').touched) {
      let fromDate = AC.get('fromDate').value;
      let toDate = AC.get('toDate').value;

      if (toDate.toISOString() < fromDate.toISOString()) {
        AC.get('toDate').setErrors({ beforeDeparture: true });
      } else {
        return null;
      }
    }
  }
}
