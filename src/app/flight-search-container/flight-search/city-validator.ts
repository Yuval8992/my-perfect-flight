import { AbstractControl } from '@angular/forms';

export class CityValidator {
  static checkCity(AC: AbstractControl) {
    let from = AC.get('from').value;
    if (AC.get('to').touched || AC.get('to').dirty) {
      let to = AC.get('to').value;

      if (from === to) {
        AC.get('to').setErrors({ sameCity: true });
      } else {
        return null;
      }
    }
  }
}
