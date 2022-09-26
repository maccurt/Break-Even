import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }
  
  breakEvenUnits = (revenuePerUnit: number, variableExpensePerUnit: number, fixedCost: number) => {
    const contributionMargin = this.contributionMargin(revenuePerUnit, variableExpensePerUnit);
    let unitsToBreakEven = fixedCost / contributionMargin;
    return Math.ceil(unitsToBreakEven);
  };

  contributionMargin = (revenuePerUnit: number, variableExpensePerUnit: number) => {
    let cm = revenuePerUnit - variableExpensePerUnit;
    return cm;
  };
}
