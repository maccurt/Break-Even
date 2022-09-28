// import { Injectable } from '@angular/core';
// import { MathService } from '../shared/math.service';
// import { IncomeInput, IncomeStatement } from './types';

// @Injectable({
//     providedIn: 'root'
// })
// export class ProfitAnalysisService {

//     constructor(private mathService: MathService) { }

//     profitAnalysisIncomeStatement = (input: IncomeInput): IncomeStatement => {

//         const round = this.mathService.round;
//         const is = new IncomeStatement();
//         // TODO As you create new methods do not duplicate this math
//         // move the math to their own method
//         is.revenue = input.packagesSold * input.revenue;
//         is.costOfGoodsSold = round(input.unitsInPackage * (input.unitCost * input.packagesSold) + input.addCostToPackage, 2);
//         is.grossProfit = is.revenue - is.costOfGoodsSold;
//         is.grossProfitPercent = this.grofitPercent(is.revenue, is.costOfGoodsSold);
        
//         is.ebayFee = this.ebayFee(input.revenue, input.packagesSold, input.ebayFeePercent, input.ebayInsertionFee);
        
//         is.payPalFee = round((input.payPalFeePercent / 100) * input.revenue + input.payPalFee, 2) * input.packagesSold
//         //(input.payPalFee * input.packagesSold), 2);
//         is.feeTotal = round(is.ebayFee + is.payPalFee, 2);
//         is.profitAfterFees = round(is.grossProfit - is.feeTotal, 2);
//         is.shippingCost = input.packagesSold * input.shippingCost;
//         is.profitAfterShipping = is.profitAfterFees - is.shippingCost;
//         if (is.profitAfterShipping > 0){
//             is.taxes = round(is.profitAfterShipping * (input.taxRatePercent / 100), 2);
//         }
//         else{
//             is.taxes = 0;
//         }
        
//         is.netIncome = round(is.profitAfterShipping - is.taxes, 2);
//         return is;
//     }

//     ebayFee = (revenue: number, unitsSold:number,  ebayFeePercent: number, insertionFee: number = 0): number => {
        
//         let revenueTotal = this.mathService.round(revenue * unitsSold,2)        
//         let fee = revenueTotal * this.mathService.round((ebayFeePercent/100) ,2);        
//         fee = fee + insertionFee;        
//         return fee;
//     }

//     grofitPercent = (revenue: number, costOfGoodSold): number => {

//         let gp = this.mathService.round(((revenue - costOfGoodSold) / revenue) * 100, 2);
//         return gp;
//     }
// }

