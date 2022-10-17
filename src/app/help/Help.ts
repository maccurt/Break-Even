import { faQuestionCircle, IconDefinition } from '@fortawesome/free-regular-svg-icons';

export class Help {
  constructor(public name: string, public defintion: string,
    public formula: string = '',  public iconClass: string = '',icon: any = null,) {      
  }
  //TODO this will default it to question circle, is that correct?
  icon: IconDefinition = faQuestionCircle; 
  showPercent: boolean = false;
}
