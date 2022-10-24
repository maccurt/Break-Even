import { ScheduleItem } from './schedule-item';
export class Schedule {
  title?:string = '';
  scheduleList: ScheduleItem[] = [];
  balanceStart = 0;
  payment!: number;
  isFixedPayment:boolean = false;
  interest = 0;
  interestRatePercent = 0;
  principal = 0;
  paymentTotal = 0;
  extraPrincipal = 0;
  periods = 0;
  extraPrincipalPayment!: number;
  years = 0;
  months = 0;
  periodsText = '';
  interestPercentTotal = 0;
}
