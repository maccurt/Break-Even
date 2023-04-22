import { AbstractControl } from "@angular/forms";

export abstract class CreditCardAbstract {
    
  isInvalid = (control: AbstractControl, showErrors: boolean = false): boolean => {
    return (control.touched && control.invalid) || (control.invalid && showErrors);
  };

}