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
    total: string;
}
export class Scenario1 implements ICreditCardBase {
    balance = '10000';
    interest = '15';
    extraPay = '100';
    fixedPay = '500';
    miniumPayResult = {
        title: 'Minium Payment',
        principal: '10,000.00',
        interest: '11,979.18',
        total: '21,979.18'
    };
    extraPayResult = {
        title: 'Minium Payment + $100.00',
        principal: '10,000.00',
        interest: '3,878.30',
        total: '13,878.30'
    };
    fixedPayResult = {
        title: '$500.00 Fixed Payment',
        principal: '10,000.00',
        interest: '1,579.48',
        total: '11,579.48'
    };
}