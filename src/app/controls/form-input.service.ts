import { Injectable } from '@angular/core';
import { FormInputType } from './form-input';

class FormInputTypeOptionKey {
  constructor(public type: FormInputType, public options: FormGroupTypeInputOptions) { }
}

export interface FormGroupTypeInputOptions {
  name: string;
  text: string;
  min: number;
  max: number;
  title: string;
  decimals: number;
  showLabel: boolean;
  placeholder?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormInputService {

  types: FormInputTypeOptionKey[] = [];

  constructor() {

    /* tslint:disable */
    this.types.push(new FormInputTypeOptionKey(FormInputType.CreditCardBalance,
      { name: 'balance', text: 'Balance', min: 1, max: 999999, title: 'How much you owe on your credit card', decimals: 0, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.CreditCardInterestRate,
      { name: 'interestRate', text: 'Interest Rate', min: 1, max: 29.99, title: 'The interest rate on your credit card', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.BalanceTransferPercent,
      { name: 'balanceTransferPercent', text: 'Balance Transfer Fee %', min: 1, max: 29.99, title: 'what percentageit will it cost to transfer balance', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.CreditCardExtraPayment,
      {
        name: 'extraPayment', text: 'What extra payment could you make monthly?', min: 1, max: 99999,
        title: 'Extra payment on top of minimum payment', decimals: 0, showLabel: true, placeholder: 'Extra Payment'
      }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.CreditCardFixedPayment,
      {
        name: 'fixedPayment', text: 'What fixed payment could you make monthly?', min: 1, max: 99999,
        title: 'Fixed Monthly Payment', decimals: 0, showLabel: true, placeholder: 'Fixed Payment'
      }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.Units,
      { name: 'units', text: 'Units', min: 1, max: 99999, title: 'How many units are you buying', decimals: 0, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.CostPerUnit,
      { name: 'costPerUnit', text: 'Cost Per Unit', min: 0, max: 99999, title: 'What Does Each Unit Cost', decimals: 3, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.UnitsCost,
      { name: 'unitsCost', text: 'Units Cost', min: 1, max: 99999, title: 'How much do the units cost you?', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.UnitsInPackage,
      { name: 'unitsInPackage', text: 'Units In Package', min: 1, max: 99999, title: 'How Many Units are you selling in package', decimals: 0, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.PackagesSold,
      { name: 'packagesSold', text: 'Packages Sold', min: 1, max: 99999, title: 'How many packages did you sell', decimals: 0, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.ShippingCost,
      { name: 'shippingCost', text: 'Shipping Cost', min: 0, max: 99999, title: 'how much does it cost to ship units to you', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.Revenue,
      { name: 'revenue', text: 'Revenue', min: 1, max: 99999, title: 'How Much do you sell the itemn for', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.None,
      { name: 'none', text: 'none', min: 1, max: 99999, title: 'There Was An Error', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.TaxRate,
      { name: 'taxRate', text: 'Tax Rate %', min: 0, max: 40.99, title: 'tax rate', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.EbayFeePercent,
      { name: 'ebayFeePercent', text: 'Ebay Fee %', min: 0, max: 12, title: 'What percent does ebay charge you on sale', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.EbayInsertionFee,
      { name: 'ebayInsertionFee', text: 'Ebay Insertion Fee', min: 0, max: 2, placeholder: 'Insertion Fee', title: 'Ebay Insertion Fee', decimals: 2, showLabel: true }));

    this.types.push(new FormInputTypeOptionKey(FormInputType.AddCostToPackage,
      { name: 'addCostToPackage', text: 'Add Cost To Package', min: 0, max: 99999, placeholder: 'add cost', title: 'Additional Cost To Add To Package', decimals: 2, showLabel: true }));
    /* tslint:enable */
  }

  getFormGroupTypeInputOptions = (type: FormInputType): FormGroupTypeInputOptions | null => {

    const key = this.types.find((i: FormInputTypeOptionKey) => {
      return i.type === type;
    });

    if (!key) {
      return null;
    }
    return key.options;

  };
}
