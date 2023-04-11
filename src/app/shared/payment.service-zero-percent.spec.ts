import { CurrencyPipe } from "@angular/common";
import { MathService } from "../math/math.service";
import { PaymentService } from "./payment.service";
//https://docs.google.com/spreadsheets/d/1S5a72NtOl2jxLVFZ_u_6v0TANPPqAH4EhCC7-Ic0mow/edit#gid=41909058
describe('creditCardScheduleZeroPercentOption', () => {

    const service: PaymentService = new PaymentService(new MathService(), new CurrencyPipe('en-US'));

    describe('ERROR CHECK intro rate is greater than annualPercentageRate', () => {
        it('should throw error', () => {
            expect(
                () =>
                    service.creditCardScheduleZeroPercentOption(1000, 15, 1, 22.5, true, true, 99, 6, 3)
            ).toThrow(new Error('input error: intro rate can not be greater than annualPercentageRate'));

        });
    });

    describe('baseline known good', () => {

        it('$1000 15% 1%+interest $100 FIXED Payment NO ZERO PERCENT', () => {
            // What happens about the 15 minimum payment
            const schedule = service.creditCardScheduleZeroPercentOption(1000, 15, 1, 100, true, true);
            expect(schedule.scheduleList.length).toBe(11);

            expect(schedule.isFixedPayment).toBe(true);
            expect(schedule.payment).toBe(100);

            const s11 = schedule.scheduleList[10];
            expect(s11.balanceStart).toBe(74.11);
            expect(s11.interest).toBe(.93);
            expect(s11.principal).toBe(74.11);
            expect(s11.balanceEnd).toBe(0);
            expect(s11.payment).toBe(75.04);
        });
    });

    describe('memory leak, 20,000 15.13 99 Intro rate, 12 months, 0 %', () => {

    });

    describe('$1000, 15%, 1, 22.5 fixed ***100 Fixed, 6 months intro, 3% intro rate, 3% fee', () => {

        const schedule = service.
            creditCardScheduleZeroPercentOption(1000, 15, 1, 22.5, true, true, 3, 6, 3);

        it('check the first period', () => {

            expect(schedule.scheduleList[0].balanceStart).toBe(1030);
            expect(schedule.scheduleList[0].interest).toBe(2.58);
            expect(schedule.scheduleList[0].principal).toBe(19.92);
            expect(schedule.scheduleList[0].payment).toBe(22.5);
            expect(schedule.scheduleList[0].balanceEnd).toBe(1010.08);

            const period7 = schedule.scheduleList[6];
            expect(period7.balanceStart).toBe(909.72);
            expect(period7.interest).toBe(11.37);
            expect(period7.principal).toBe(11.13);
            expect(period7.payment).toBe(22.5);
            expect(period7.balanceEnd).toBe(898.59);
        });
    });

    describe('$1000, 15%, 1% of balance, NO FIXED PAYMENT 6 months intro, 3% intro rate, 3% fee', () => {

        const schedule = service.
            creditCardScheduleZeroPercentOption(1000, 15, 1, 0, false, true, 3, 6, 3);

        it('check the first period', () => {

            expect(schedule.scheduleList[0].balanceStart).toBe(1030);
            expect(schedule.scheduleList[0].interest).toBe(2.58);
            expect(schedule.scheduleList[0].principal).toBe(12.42);
            expect(schedule.scheduleList[0].payment).toBe(15);
            expect(schedule.scheduleList[0].balanceEnd).toBe(1017.58);

            const period7 = schedule.scheduleList[6];
            expect(period7.balanceStart).toBe(954.98);
            expect(period7.interest).toBe(11.94);
            expect(period7.principal).toBe(9.55);
            expect(period7.payment).toBe(21.49);
            expect(period7.balanceEnd).toBe(945.43);
        });
    });

    describe('6 months 0% financing 3% charge', () => {
        const schedule = service.
            creditCardScheduleZeroPercentOption(1000, 15, 1, 0, true, true, 0, 6, 3);

        it('20K at 15.13 include interest', () => {
            const result = service.determineMonthlyPayment(0, 1, 20000, 15.13, true);
            //this should match the spreadsheet baseline
            expect(result).toBe(452.20);
        });

        it('payment should be 15', () => {
            //THE PAYMNET WILL BE 15 because that is the MINIMUM
            const result = service.determineMonthlyPayment(0, 1, 1000, 0, true);
            expect(result).toBe(15);
        });

        it('charge for introductory rate should be $30.00', () => {
            expect(schedule.chargeForIntroductoryRate).toBe(30);
        });

        it('balance start should be 1030', () => {
            expect(schedule.balanceStart).toBe(1030);
        });

        it('the first 6 periods should have 0% interest', () => {
            expect(schedule.scheduleList[0].interest).toBe(0);
            expect(schedule.scheduleList[1].interest).toBe(0);
            expect(schedule.scheduleList[2].interest).toBe(0);
            expect(schedule.scheduleList[3].interest).toBe(0);
            expect(schedule.scheduleList[4].interest).toBe(0);
            expect(schedule.scheduleList[5].interest).toBe(0);
        });
        it('the 7th periond index 6 should not have a 0% interest', () => {
            expect(schedule.scheduleList[6].interest).toBeGreaterThan(0);
        });

        it('the first 6 payments should be $15 minimum', () => {
            expect(schedule.scheduleList[0].payment).toBe(15);
            expect(schedule.scheduleList[1].payment).toBe(15);
            expect(schedule.scheduleList[2].payment).toBe(15);
            expect(schedule.scheduleList[3].payment).toBe(15);
            expect(schedule.scheduleList[4].payment).toBe(15);
            expect(schedule.scheduleList[5].payment).toBe(15);
        });

        it('the first 6 balance end should be correct', () => {
            expect(schedule.scheduleList[0].balanceEnd).toBe(1015);
            expect(schedule.scheduleList[1].balanceEnd).toBe(1000);
            expect(schedule.scheduleList[2].balanceEnd).toBe(985);
            expect(schedule.scheduleList[3].balanceEnd).toBe(970);
            expect(schedule.scheduleList[4].balanceEnd).toBe(955);
            expect(schedule.scheduleList[5].balanceEnd).toBe(940);
        });

        it('the 7 period payments should be 900.90', () => {
            expect(schedule.scheduleList[6].balanceStart).toBe(940);
            expect(schedule.scheduleList[6].balanceEnd).toBe(930.6);
        });

        it('the 19 period payments should be correct', () => {
            expect(schedule.scheduleList[18].balanceStart).toBe(833.19);
            expect(schedule.scheduleList[18].principal).toBe(8.34);
            expect(schedule.scheduleList[18].interest).toBe(10.41);
            expect(schedule.scheduleList[18].balanceEnd).toBe(824.85);
        });
    });

    describe('1000 balance 15% 6 month at 0% intro rate 3% transfer fee', () => {
        const schedule = service.
            creditCardScheduleZeroPercentOption(1000, 15, 1, 100, true, true, 0, 6, 3);

        it('there should only be 11 schedule items', () => {
            expect(schedule.scheduleList.length).toBe(11);
        });

        it('the first 6 payments should be $15 minimum', () => {
            expect(schedule.scheduleList[0].payment).toBe(100);
            expect(schedule.scheduleList[1].payment).toBe(100);
            expect(schedule.scheduleList[2].payment).toBe(100);
            expect(schedule.scheduleList[3].payment).toBe(100);
            expect(schedule.scheduleList[4].payment).toBe(100);
            expect(schedule.scheduleList[5].payment).toBe(100);
        });

        it('the first 6 balance end should be correct', () => {
            expect(schedule.scheduleList[0].balanceEnd).toBe(930);
            expect(schedule.scheduleList[1].balanceEnd).toBe(830);
            expect(schedule.scheduleList[2].balanceEnd).toBe(730);
            expect(schedule.scheduleList[3].balanceEnd).toBe(630);
            expect(schedule.scheduleList[4].balanceEnd).toBe(530);
            expect(schedule.scheduleList[5].balanceEnd).toBe(430);
        });
        it('the 7 balance end should be correct', () => {
            expect(schedule.scheduleList[6].balanceStart).toBe(430);
            expect(schedule.scheduleList[6].interest).toBe(5.38);
            expect(schedule.scheduleList[6].balanceEnd).toBe(335.38);
        });

        it('the 11 period should be correct', () => {
            expect(schedule.scheduleList[10].balanceStart).toBe(44.34);
            expect(schedule.scheduleList[10].interest).toBe(.55);
            expect(schedule.scheduleList[10].payment).toBe(44.89);
            expect(schedule.scheduleList[10].balanceEnd).toBe(0);
        });
    });

    describe('1000 balance 15% 6 month at 2.9% intro rate 3% transfer fee', () => {
        const schedule = service.
            creditCardScheduleZeroPercentOption(1000, 15, 1, 100, true, true, 2.9, 6, 3);

        it('there should only be 11 schedule items', () => {
            expect(schedule.scheduleList.length).toBe(11);
        });

        it('the first 6 interest periods should reflect the 2.9%', () => {
            expect(schedule.scheduleList[0].interest).toBe(2.49);
            expect(schedule.scheduleList[1].interest).toBe(2.26);
            expect(schedule.scheduleList[2].interest).toBe(2.02);
            expect(schedule.scheduleList[3].interest).toBe(1.78);
            expect(schedule.scheduleList[4].interest).toBe(1.55);
            expect(schedule.scheduleList[5].interest).toBe(1.31);
        });

        it('the first 6 payments should be $15 minimum', () => {
            expect(schedule.scheduleList[0].payment).toBe(100);
            expect(schedule.scheduleList[1].payment).toBe(100);
            expect(schedule.scheduleList[2].payment).toBe(100);
            expect(schedule.scheduleList[3].payment).toBe(100);
            expect(schedule.scheduleList[4].payment).toBe(100);
            expect(schedule.scheduleList[5].payment).toBe(100);
        });

        it('the first 6 balance end should be correct', () => {
            expect(schedule.scheduleList[0].balanceEnd).toBe(932.49);
            expect(schedule.scheduleList[1].balanceEnd).toBe(834.75);
            expect(schedule.scheduleList[2].balanceEnd).toBe(736.77);
            expect(schedule.scheduleList[3].balanceEnd).toBe(638.55);
            expect(schedule.scheduleList[4].balanceEnd).toBe(540.1);
            expect(schedule.scheduleList[5].balanceEnd).toBe(441.41);
        });
        it('the 7 balance end should be correct', () => {
            expect(schedule.scheduleList[6].balanceStart).toBe(441.41);
            expect(schedule.scheduleList[6].interest).toBe(5.52);
            expect(schedule.scheduleList[6].balanceEnd).toBe(346.93);
        });

        it('the 11 period should be correct', () => {
            expect(schedule.scheduleList[10].balanceStart).toBe(56.34);
            expect(schedule.scheduleList[10].interest).toBe(.7);
            expect(schedule.scheduleList[10].payment).toBe(57.04);
            expect(schedule.scheduleList[10].balanceEnd).toBe(0);
        });
    });
});