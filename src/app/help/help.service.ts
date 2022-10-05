import { Injectable } from '@angular/core';
export class Help {
  constructor(public name: string, public defintion: string,public formula: string = '') {
  }
}

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  grossProfitPercent = new Help('Gross Profit Percent',
    'Indicates amount of revenue left after subtracting variable expense. expressed as a percentage of total revenue.',
    'gross profit % = ( revenue - expense) / revenue)');

  constructor() { }
}
