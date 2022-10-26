export interface ICreditCardBase {
    balance: string;
    interest: string;
    extraPay: string;
    fixedPay: string;
    miniumPayResult: ICreditCardResult;
    extraPayResult: ICreditCardResult;
    fixedPayResult: ICreditCardResult;
}

export interface ICreditCardResult {
    title: string;
    principal: string;
    interest: string;
    interestSaved:string;
    interestSavedFormula:string;
    interestSavedPercent:string;
    total: string;
    timeToPayOfDebt: string;
}
export class Scenario1 implements ICreditCardBase {
    balance = '10000';
    interest = '15';
    extraPay = '100';
    fixedPay = '500';
    miniumPayResult = {
        title: 'Minimum Payment',
        principal: '10,000.00',
        interest: '11,979.18',
        total: '21,979.18',
        interestSaved:'',
        interestSavedFormula:'',
        interestSavedPercent:'',
        timeToPayOfDebt: '27 Years, 11 Months'
    };
    extraPayResult = {
        title: 'Minimum Payment + $100.00',
        principal: '10,000.00',
        interest: '3,878.30',
        interestSaved:'8,100.88',
        interestSavedFormula:'$21,979.18 - $13,878.30',
        interestSavedPercent:'You Will Save 67.62% In Interest.',
        total: '13,878.30',
        timeToPayOfDebt: '5 Years, 9 Months'
    };
    fixedPayResult = {
        title: '$500.00 Fixed Payment',
        principal: '10,000.00',
        interest: '1,579.48',
        interestSaved:'10,399.70',
        interestSavedFormula:'$21,979.18 - $11,579.48',
        interestSavedPercent:'You Will Save 86.81% In Interest.',
        total: '11,579.48',
        timeToPayOfDebt: '2 Years, 0 Months'
    };
}