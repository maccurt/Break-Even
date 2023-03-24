export class ScheduleItem {
  balanceStart!: number;
  balanceEnd!: number;
  interest!: number;
  interestPercentOfPayment?: number;  
  principal!: number;
  principalPercentOfPayment?:number;
  extraPrincipal!: number;
  payment?: number;
}
