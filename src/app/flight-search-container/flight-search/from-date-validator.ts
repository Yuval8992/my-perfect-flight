import { AbstractControl } from '@angular/forms';

export class FromDateValidator {
  static checkDate(AC: AbstractControl) {
    if (AC.get('fromDate').touched || AC.get('fromDate').dirty) {
      let fromDate = AC.get('fromDate').value;

      let today = new Date();
      if (
        fromDate <
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      ) {
        AC.get('fromDate').setErrors({ atPast: true });
      } else {
        return null;
      }
    }
  }
}
