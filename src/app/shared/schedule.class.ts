import { PaymentType } from '../credit-card/credit-card-calculator/payment-type.enum';
import { ScheduleItem } from './schedule-item';
export class Schedule {
  paymentType?:PaymentType;  //TODO in the future make this so it is not nullable if feasible, cc-calculator
  title?:string = '';
  scheduleList: ScheduleItem[] = [];
  balanceStart = 0;
  payment!: number;
  isFixedPayment:boolean = false;  //TODO perhaps we make a enum for all the modes for this
  interest = 0;
  interestRatePercent = 0;
  principal = 0;
  paymentTotal = 0;  
  periods = 0;
  //TODO what is the diffence here?  //this needs to be fixed
  extraPrincipal = 0; //this might be for the total and is not used in credit card
  extraPrincipalPayment!: number; //This is extra payment you are making
  years = 0;
  months = 0;
  periodsText = '';
  interestPercentTotal = 0;
}
