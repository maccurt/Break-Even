describe('cost to transfer', () => {

    before(() => {
        cy.visit('credit-card-devil');
        cy.getDataTestId('balance').type('20000').blur();
        cy.getDataTestId('has-intro-rate').check();
        cy.getDataTestId('intro-months').clear().type('12').blur();
    });

    describe('baseline', () => {

        it('cost to transfer text should not exist', () => {
            cy.getDataTestId('cost-to-transfer').should('not.exist');
        });
    });

    describe('enter 3 into transfer cost percent', () => {
        before(() => {
            cy.getDataTestId('intro-transfer-cost-percent').clear().type('3').blur();
        });

        it('cost to transfer text should be $600', () => {
            cy.getDataTestId('cost-to-transfer').textShouldEqual('$600.00 to transfer balance.');
        });
    });

    describe('change balance to 10000', () => {
        before(() => {
            cy.getDataTestId('balance').focus().clear().type('10000').blur();
        });

        it('cost to transfer text should be $300', () => {
            cy.getDataTestId('cost-to-transfer').textShouldEqual('$300.00 to transfer balance.');
        });
    });

    describe('enter 2 into transfer cost percent', () => {
        before(() => {
            cy.getDataTestId('intro-transfer-cost-percent').clear().type('2').blur();
        });

        it('cost to transfer text should be $200', () => {
            cy.getDataTestId('cost-to-transfer').textShouldEqual('$200.00 to transfer balance.');
        });
    });

    describe('enter 0 in into moths', () => {
        before(() => {
            cy.getDataTestId('intro-months').clear().type('0').blur();
        });
        it('cost to transfer text should be $200', () => {
            cy.getDataTestId('cost-to-transfer').textShouldEqual('$200.00 to transfer balance.');
        });
    });

});