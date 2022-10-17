import { ScheduleItem } from './schedule-item';
export class Schedule {
  scheduleList: ScheduleItem[] = [];
  balanceStart = 0;
  payment!: number;
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
