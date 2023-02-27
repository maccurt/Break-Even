export enum minPayType{
    InterestPlus1PercentOfBalance = 'Interest + 1% of balance',
    FourPercentOfBalance ='4% of balance',
    TwoPercentOfBalance ='2% of balance',
    TwoPoint8PercentOfBalance ='2.08% of balance',
    TwoPoint78PercentOfBalance = '2.78% of balance'
}

export function setMinimumPaymentType(type:minPayType){
    cy.getDataTestId('minimum-payment-type').select(type);
}