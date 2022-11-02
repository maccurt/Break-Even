import { FormControl, ValidatorFn } from '@angular/forms';

export class FormInput extends FormControl {

    //TODO What could this break by removing this during upgrade
    //This might cause a problem, not sure what we were doing here?
     //addValidators = true;
     isAddValidators = true;

    constructor(public type: FormInputType = FormInputType.None) {
        super();

        if (this.type === null || this.type === undefined) {
            this.type = FormInputType.None;
        }
    }
    errorMessage = '';

    valueNumeric = (): number => {
        if (this.value !== null && !isNaN(this.value) && this.value.toString().trim() !== '') {
            return parseFloat(this.value.toString());
        }
        return 0;
    };
}

export enum FormInputType {
    None = 0,
    CreditCardBalance,
    CreditCardInterestRate,
    CreditCardExtraPayment,
    CreditCardFixedPayment,
    BalanceTransferPercent,
    Units,
    UnitsCost,
    CostPerUnit,
    UnitsInPackage,
    PackagesSold,
    ShippingCost,
    Revenue,
    TaxRate,
    EbayFeePercent,
    EbayInsertionFee,
    AddCostToPackage
}
