import { CurrencyPipe } from "@angular/common";
import { MathService } from "../math/math.service";
import { CreditCardInput, PaymentService } from "./payment.service";

describe('creditCardScheduleTransferCompare', () => {

    const service: PaymentService = new PaymentService(new MathService(), new CurrencyPipe('en-US'));


    it('should behave...', () => {


        //const schedule = service.creditCardScheduleZeroPercentOption(20000, 15.13, 1, 0, false, true);
        let c1 = new CreditCardInput();
        c1.balance = 20000;
        c1.annualPercentageRate = 15.13;
        c1.extraPayment = 0;
        c1.isFixedPayment = false;
        c1.financeChargePercent = 1;
        c1.includeApr = true;


        let c2 = new CreditCardInput();
        c2.balance = 20000;
        c2.annualPercentageRate = 15.13;
        c2.extraPayment = 0;
        c2.includeApr = true;
        c2.financeChargePercent = 1;
        c2.introFeePercent = 3;
        c2.introMonths = 12;
        c2.introRate = 0;

        let compare = service.creditCardScheduleTransferCompare(c1, c2);

        let s1 = compare.schedule1;
        let s2 = compare.schedule2;
        expect(s1.balanceStart).toBe(20000);
        expect(s1.scheduleList.length).toBe(404);
        expect(s1.scheduleList[403].balanceStart).toBe(14.73);

        expect(s2.balanceStart).toBe(20600);
        expect(s2.scheduleList.length).toBe(407);
        expect(s2.scheduleList[406].balanceStart).toBe(13.95);

        expect(compare.interestDifference).toBe(0);
        expect(compare.monthsSaved).toBe(0);
        expect(compare.periodsSavedText).toBe('');
        expect(compare.interestDifferencePercent).toBe(0);
        

    });

});