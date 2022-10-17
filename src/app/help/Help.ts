import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export class Help {
  constructor(public name: string, public defintion: string,
    public formula: string = '',  public iconClass: string = '',icon: any = null,) {
  }

  icon!: IconDefinition;
  showPercent: boolean = false;
}
