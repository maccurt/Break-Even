export const hasNoIntroRateInputs = ()=>{

    describe('intro rate fields should not be shown', () => {

        it('should NOT have has-intro-rate-container', () => {
            cy.getDataTestId('has-intro-rate-container').should('not.exist');
        });        

        it('should NOT have intro interest rate', () => {
            cy.getDataTestId('intro-interest-rate').should('not.exist');
        });        

        it('should NOT have intro month', () => {
            cy.getDataTestId('intro-months').should('not.exist');
        });        

        it('should NOT have intro transfer cost percent', () => {
            cy.getDataTestId('intro-transfer-cost-percent').should('not.exist');
        });    
    });
};

export const hasIntroRateInputs = ()=>{

    describe('intro rate fields SHOULD BE shown', () => {

        it('should have has-intro-rate-container', () => {
            cy.getDataTestId('has-intro-rate-container').should('exist');
        });        

        it('should have intro interest rate', () => {
            cy.getDataTestId('intro-interest-rate').should('exist');
        });        

        it('should have intro month', () => {
            cy.getDataTestId('intro-months').should('exist');
        });        

        it('should have intro transfer cost percent', () => {
            cy.getDataTestId('intro-transfer-cost-percent').should('exist');
        });    
    });
};