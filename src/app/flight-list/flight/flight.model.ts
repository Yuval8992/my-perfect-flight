export class Flight {
  public flightID: number;
  public airplaneID: string;
  public from: string;
  public to: string;
  public departureDate: Date;
  public arrivalDate: Date;
  public price: number[];

  constructor(
    flightID: number,
    airplaneID: string,
    from: string,
    to: string,
    departureDate: Date,
    arrivalDate: Date,
    price: number[]
  ) {
    this.flightID = flightID;
    this.airplaneID = airplaneID;
    this.from = from;
    this.to = to;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.price = price;
  }
}
