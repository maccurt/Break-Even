import { ValidatorFn, FormGroup, Validators, AbstractControl } from '@angular/forms';

export function revenueVariableExpenseValidator(): ValidatorFn {

    return (form: AbstractControl): Validators | null => {
        
        const variableExpense: number = form.get('variableExpense')?.value;
        const revenue: number = form.get('revenuePerUnit')?.value;
        
        if (revenue <= variableExpense) {
            return { variableExpenseError: 'variable must be less than revenue per unit' };
        }
        return null;

    }
}