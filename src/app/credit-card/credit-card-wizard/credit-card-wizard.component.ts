import { FormInput, FormInputType } from './../../controls/form-input';
import { HelpService } from './../../help/help.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-card-wizard',
  templateUrl: './credit-card-wizard.component.html',
  styleUrls: ['./credit-card-wizard.component.scss']
})
export class CreditCardWizardComponent {

  balanceControl:FormInput = new FormInput(FormInputType.CreditCardBalance);
  
  formGroup = this.fb.group({
    balance: this.balanceControl
  });

  constructor(private fb: FormBuilder,
    public help: HelpService) {
  }

  calculate = () => {

  };

}
