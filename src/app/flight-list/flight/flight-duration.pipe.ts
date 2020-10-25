import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightDuration'
})
export class FlightDurationPipe implements PipeTransform {

  transform(duration: number, stops: number): string {
    let stopsFormatted;
    if (stops === 0) {
      stopsFormatted = 'Non-stop';
    } else if (stops === 1) {
      stopsFormatted = '1 stop';
    } else {
      stopsFormatted = `${stops} stops`;
    }

    return `${stopsFormatted} | ${Math.floor(duration / 60)}h ${duration % 60}m`;
  }
}
