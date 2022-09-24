import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }

  breakEvenUnits = (revenuePerUnit: number, variableExpensePerUnit: number, fixedCost: number) => {
    let unitsToBreakEven = fixedCost / (revenuePerUnit - variableExpensePerUnit);
    
    return Math.ceil(unitsToBreakEven);
  }
}
