
import { MathService } from '../math/math.service';
import { PaymentService } from './payment.service';
import { ScheduleItem } from './schedule-item';

describe('PaymentService', () => {
  const service: PaymentService = new PaymentService(new MathService());

  describe('creditCardSchedule', () => {

    it('$1000 15% 1%+interest $100 FIXED Payment', () => {
      // What happens about the 15 minimum payment
      const schedule = service.creditCardSchedule(1000, 15, 1, 100, true, true);
      expect(schedule.scheduleList.length).toBe(11);
      const s11 = schedule.scheduleList[10];
      expect(s11.balanceStart).toBe(74.11);
      expect(s11.interest).toBe(.93);
      expect(s11.principal).toBe(74.11);
      expect(s11.balanceEnd).toBe(0);
      expect(s11.payment).toBe(75.04);
    });

    it('$100,000 15% 1%+interest $0 extra payment', () => {
      // What happens about the 15 minimum payment
      const schedule = service.creditCardSchedule(10000, 15, 1, 0, false, true);
      expect(schedule.scheduleList.length).toBe(335);
      const s335 = schedule.scheduleList[334];
      expect(s335.balanceStart).toBe(10.7);
      expect(s335.interest).toBe(.13);
      expect(s335.principal).toBe(10.7);
      expect(s335.balanceEnd).toBe(0);
      expect(s335.payment).toBe(10.83);
    });

    it('$100,000 15% 1%+interest $100 extra payment', () => {
      // What happens about the 15 minimum payment
      const schedule = service.creditCardSchedule(10000, 15, 1, 100, false, true);
      expect(schedule.scheduleList.length).toBe(69);
      const s69 = schedule.scheduleList[68];
      expect(s69.balanceStart).toBe(68.17);
      expect(s69.interest).toBe(.85);
      expect(s69.principal).toBe(68.17);
      expect(s69.balanceEnd).toBe(0);
      expect(s69.payment).toBe(69.02);
    });

    describe('getScheduleLoan', () => {

      it('80000 2.75%, 1000 payment, 100 Extra', () => {
        const schedule = service.getScheduleLoan(80000, 2.75, 408.24, 100);
        expect(schedule.scheduleList.length).toBe(196);
        const s196 = schedule.scheduleList[195];
        expect(s196.balanceStart).toBe(233.12);
        expect(s196.interest).toBe(.53);
        expect(s196.principal).toBe(233.12);
        expect(s196.extraPrincipal).toBe(0);
      });

    });

    describe('re-factor to add original loan legth and periods left', () => {

      describe('300000 5% 100 extra payment', () => {

        describe('2 years or 2 year payments left', () => {

          it('should calculate correctly', () => {

            const schedule = service.getScheduleAdvanced(30000, 5, 2, 24, 100);

            expect(schedule.payment).toEqual(1316.14);
            expect(schedule.scheduleList.length).toBe(23);

            expect(schedule.scheduleList[0].extraPrincipal).toBe(100);
            expect(schedule.scheduleList[11].extraPrincipal).toBe(100);
            expect(schedule.scheduleList[12].extraPrincipal).toBe(100);

            const s1 = schedule.scheduleList[0];
            expect(s1.balanceEnd).toEqual(28708.86);

            const s23 = schedule.scheduleList[22];
            expect(s23.balanceStart).toEqual(316.99);
            expect(s23.principal).toEqual(316.99);
            expect(s23.balanceEnd).toEqual(0);

          });

        });

        describe('2 years or 1 year payments left', () => {

          it('should calculate correctly', () => {

            const schedule = service.getScheduleAdvanced(30000, 5, 2, 12, 100);

            expect(schedule.payment).toEqual(1316.14);
            expect(schedule.scheduleList.length).toBe(24);

            expect(schedule.scheduleList[0].extraPrincipal).toBe(0);
            expect(schedule.scheduleList[11].extraPrincipal).toBe(0);
            expect(schedule.scheduleList[12].extraPrincipal).toBe(100);

            const s1 = schedule.scheduleList[0];
            expect(s1.balanceEnd).toEqual(28808.86);

            const s23 = schedule.scheduleList[22];
            expect(s23.balanceEnd).toEqual(187.51);

            const s24 = schedule.scheduleList[23];
            expect(s24.balanceEnd).toEqual(0);

          });

        });
      });

    });

    describe('periodicInterestRate', () => {
      it('3% should return .025', () => {
        expect(service.periodicInterestRate(3)).toEqual(.0025);
      });
    });

    describe('discountFactor', () => {
      it('6% 30 Year Mortgage', () => {
        expect(service.discountFactor(6, 30)).toEqual(166.7916);
      });
    });

    describe('payment', () => {
      it('6% 30 Year $100,000 Mortgage', () => {
        expect(service.payment(100000, 6, 30)).toEqual(599.55);
      });

      it('3% 7 Year $10,000 Car Loan', () => {
        expect(service.payment(10000, 3, 7)).toEqual(132.13);
      });

      it('4% 30 Year $300,000 Mortgage', () => {
        expect(service.payment(300000, 4, 30)).toEqual(1432.25);
      });
    });

    describe('period saved text', () => {

      it('42 should return 3 Years,6 Months', () => {
        const t = service.getPeriodsText(42);
        expect(t).toBe('3 Years, 6 Months');
      });

      it('18 should return 1 Year,6 Months', () => {
        const t = service.getPeriodsText(18);
        expect(t).toBe('1 Year, 6 Months');
      });

      it('6 should return 6 Months', () => {
        const t = service.getPeriodsText(6);
        expect(t).toBe('6 Months');
      });

    });

    describe('compareSchedule', () => {

      describe('$300,000 4% 30 Years $100 extra payment', () => {
        it('should calculate fields correctly', () => {

          // https://www.daveramsey.com/mortgage-payoff-calculator
          const s1 = service.getScheduleYears(300000, 4, 30);
          const s2 = service.getScheduleYears(300000, 4, 30, 100);
          expect(s1.paymentTotal).toBe(515607.18);
          expect(s1.interest).toBe(215607.18);
          expect(s1.scheduleList.length).toBe(360);

          expect(s2.paymentTotal).toBe(486860.90);
          expect(s2.interest).toBe(186860.90);
          expect(s2.scheduleList.length).toBe(318);

          const sc = service.getScheduleCompare(s1, s2);
          expect(sc.interestDifference).toBe(28746.28);
          expect(sc.interestDifferencePercent).toBe(13.33);
          expect(sc.monthsSaved).toBe(42);
          expect(sc.periodsSavedText).toBe('3 Years, 6 Months');

        });
      });

      describe('$30,000 5% 2 Years and schedule with $100 extra payment', () => {
        it('should calculate fields correctly', () => {

          const s1 = service.getScheduleYears(30000, 5, 2);
          const s2 = service.getScheduleYears(30000, 5, 2, 100);
          const sc = service.getScheduleCompare(s1, s2);
          expect(sc.interestDifference).toBe(114.01);
          expect(sc.interestDifferencePercent).toBe(7.18);
        });
      });

    });

    describe('getSchedule', () => {

      describe('$30,000 5% 2 Years', () => {
        it('should calculate schedule correctly', () => {
          const schedule = service.getScheduleYears(30000, 5, 2);

          expect(schedule.payment).toBe(1316.14);
          expect(schedule.interest).toBe(1587.40);
          expect(schedule.principal).toBe(30000);
          expect(schedule.paymentTotal).toBe(31587.40);

          expect(schedule.scheduleList.length).toBe(24);

          const s1 = schedule.scheduleList[0];
          expect(s1.balanceStart).toEqual(30000);
          expect(s1.interest).toEqual(125);
          expect(s1.principal).toEqual(1191.14);
          expect(s1.balanceEnd).toEqual(28808.86);

          const s2 = schedule.scheduleList[1];
          expect(s2.balanceStart).toEqual(28808.86);
          expect(s2.interest).toEqual(120.04);
          expect(s2.principal).toEqual(1196.10);
          expect(s2.balanceEnd).toEqual(27612.76);

          const s24 = schedule.scheduleList[23];
          expect(s24.balanceStart).toEqual(1310.72);
          expect(s24.interest).toEqual(5.46);
          expect(s24.principal).toEqual(1310.72);
          expect(s24.balanceEnd).toEqual(0);
        });
      });

      describe('30,000 5% 2 Years 100 Extra Payment', () => {
        it('item 1 should.', () => {
          const schedule = service.getScheduleYears(30000, 5, 2, 100);
          expect(schedule.payment).toBe(1316.14);
          expect(schedule.interest).toBe(1473.39);
          expect(schedule.principal).toBe(27800);
          expect(schedule.extraPrincipal).toBe(2200);
          expect(schedule.paymentTotal).toBe(31473.39);

          expect(schedule.scheduleList.length).toBe(23);

          const s1 = schedule.scheduleList[0];
          expect(s1.balanceStart).toEqual(30000);
          expect(s1.interest).toEqual(125);
          expect(s1.principal).toEqual(1191.14);
          expect(s1.balanceEnd).toEqual(28708.86);

          const s2 = schedule.scheduleList[1];
          expect(s2.balanceStart).toEqual(28708.86);
          expect(s2.interest).toEqual(119.62);
          expect(s2.principal).toEqual(1196.52);
          expect(s2.balanceEnd).toEqual(27412.34);

          const s23 = schedule.scheduleList[22];
          expect(s23.balanceStart).toEqual(316.99);
          expect(s23.interest).toEqual(1.32);
          expect(s23.principal).toEqual(316.99);
          expect(s23.balanceEnd).toEqual(0);
        });
      });

      describe('$300,000 4% 30 Years', () => {
        it('should calculate correctly', () => {
          const schedule = service.getScheduleYears(300000, 4, 30);

          expect(schedule.scheduleList.length).toBe(360);
          const s1 = schedule.scheduleList[0];

          expect(s1.balanceStart).toEqual(300000);
          expect(s1.interest).toEqual(1000);
          expect(s1.principal).toEqual(432.25);
          expect(s1.balanceEnd).toEqual(299567.75);

          const s2 = schedule.scheduleList[1];
          expect(s2.balanceStart).toEqual(299567.75);
          expect(s2.interest).toEqual(998.56);
          expect(s2.principal).toEqual(433.69);
          expect(s2.balanceEnd).toEqual(299134.06);

          const s360 = schedule.scheduleList[359];
          expect(s360.balanceStart).toEqual(1424.68);
          expect(s360.interest).toEqual(4.75);
          expect(s360.extraPrincipal).toEqual(0);
          expect(s360.principal).toEqual(1424.68);
          expect(s360.balanceEnd).toEqual(0);
        });
      });

      describe('bug fix', () => {

        describe('$100,000 loan 2.75 interest at 30 years', () => {

          it('should have a balance end of zero', () => {
            const s = service.getScheduleYears(100000, 2.75, 30, 100);
            const x = s.scheduleList[s.scheduleList.length - 1];
            expect(x.extraPrincipal).toEqual(44.5);
            expect(x.balanceEnd).toEqual(0);
          });

          describe('adjustScheduleItem', () => {

            // it('balance start 451.75, interest 1.04 principal 407.20 extra princiap 100', () => {
            //   let si = new ScheduleItem();
            //   si.balanceStart = 451.75
            //   si.interest = 1.04;
            //   si.principal = 407.20;
            //   si.extraPrincipal = 100;
            //   si = service.adjustScheduleItem(si);
            //   expect(si.extraPrincipal).toEqual(43.51);
            //   expect(si.balanceEnd).toBe(0);
            // });

            // it('Extra Principal 0', () => {
            //   let si = new ScheduleItem();
            //   si.balanceStart = 1424.68
            //   si.interest = 4.75;
            //   si.principal = 1427.50;
            //   si.extraPrincipal = 0;
            //   si = service.adjustScheduleItem(si);
            //   expect(si.extraPrincipal).toEqual(0);
            //   expect(si.balanceEnd).toBe(0);
            // });

            // it('Extra Principal 100', () => {
            //   let si = new ScheduleItem();
            //   si.balanceStart = 316.99
            //   si.interest = 1.32;
            //   si.principal = 1314.82;
            //   si.extraPrincipal = 100;
            //   si = service.adjustScheduleItem(si);
            //   expect(si.principal).toEqual(316.99);
            //   expect(si.extraPrincipal).toEqual(0);
            //   expect(si.balanceEnd).toBe(0);
            // });

            it('30,000 2 years 5 rate 100 extra payment', () => {
              const si = new ScheduleItem();
              si.balanceStart = 316.99;
              si.interest = 1.32;
              si.principal = 1314.82;
              si.extraPrincipal = 100;
              service.adjustScheduleItem(1316.14, si);
              expect(si.principal).toEqual(316.99);
              expect(si.extraPrincipal).toEqual(0);
              expect(si.balanceEnd).toBe(0);
            });

            it('100,000 30 years 2.75 rate 100 extra payment', () => {
              const si = new ScheduleItem();
              si.balanceStart = 451.70;
              si.interest = 1.04;
              si.principal = 407.20;
              si.extraPrincipal = 100;
              service.adjustScheduleItem(408.24, si);
              expect(si.principal).toEqual(407.20);
              expect(si.extraPrincipal).toEqual(44.5);
              expect(si.balanceEnd).toBe(0);
            });

            it('100,000 30 years 2.75 rate 0 extra payment', () => {
              const si = new ScheduleItem();
              si.balanceStart = 408.14;
              si.interest = .94;
              si.principal = 407.30;
              si.extraPrincipal = 0;
              service.adjustScheduleItem(408.24, si, true);
              expect(si.principal).toEqual(408.14);
              expect(si.extraPrincipal).toEqual(0);
              expect(si.balanceEnd).toBe(0);
            });

          });

        });

      });
    });
  });
});
