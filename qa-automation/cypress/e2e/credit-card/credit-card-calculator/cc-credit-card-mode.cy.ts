describe('credit card mode routes', () => {

    describe('credit-card-devil', () => {

        before(() => {
            cy.visit('credit-card-devil');
        });        

        it('the balance text should be correct', () => {        
            cy.getDataTestId('balance-text').textShouldEqual('What Is The Balance On Your Credit Card?');
        });
    });

    describe('credit-card-introductory-rate', () => {

        before(() => {
            cy.visit('credit-card-introductory-rate');
        });
        
        it('the balance text should be correct', () => {        
            cy.getDataTestId('balance-text').textShouldEqual('Balance On Current Credit Card?');
        });
    });
    
});