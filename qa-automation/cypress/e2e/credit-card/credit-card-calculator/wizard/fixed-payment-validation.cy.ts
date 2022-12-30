
describe('credit card wizard validation', () => {

    before(() => {
        cy.visit('/credit-card-wizard');
    });

    describe('set balance to 20000', () => {

        before(() => {
            cy.getDataTestId('balance').clear().type('20000').blur();
        });

        it('fixed payment should have value 452.17', () => {
            cy.getDataTestId('fixed-payment').should('have.value', '452.17');
        });

        it('set to minimum payment label should exist', () => {
            cy.getDataTestId('fix-pay-is-min').should('exist');
        });

        it('required text should be correct', () => {
            cy.getDataTestId('fixed-payment-hint').textShouldEqual('required: 452.17 or greater');
        });
    });

    describe('set balance to 10000', () => {

        before(() => {
            cy.getDataTestId('balance').clear().type('10000').blur();
        });

        it('fixed payment should have value 452.17', () => {
            cy.getDataTestId('fixed-payment').should('have.value', '452.17');
        });

        it('set to minimum payment label should NOT exist', () => {
            cy.getDataTestId('fix-pay-is-min').should('not.exist');
        });

        it('required text should be correct', () => {
            cy.getDataTestId('fixed-payment-hint').textShouldEqual('required: 226.08 or greater');
        });

        describe('change fix payment to 226.07 which is invalid ', () => {

            before(() => {
                cy.getDataTestId('fixed-payment').clear().type('226.07').blur();
            });

            it('fixed payment should be set to miniium which is a value of 226.08', () => {
                cy.getDataTestId('fixed-payment').should('have.value', '226.08');
            });

            // it('set to minimum payment label should NOT exist', () => {
            //     cy.getDataTestId('fix-pay-is-min').should('not.exist');
            // });

            // it('set fixed payment link should exist', () => {
            //     cy.getDataTestId('set-fix-payment').should('exist');
            // });
        });

        // describe('click set fixed payment link', () => {

        //     before(() => {
        //         cy.getDataTestId('set-fix-payment').click();
        //     });

        //     it('set to minimum payment label should exist', () => {
        //         cy.getDataTestId('fix-pay-is-min').should('exist');
        //     });

        //     it('set fixed payment link should NOT exist', () => {
        //         cy.getDataTestId('set-fix-payment').should('not.exist');
        //     });

        //     it('fixed payment should have value 226.08', () => {
        //         cy.getDataTestId('fixed-payment').should('have.value', '226.08');
        //     });
        // });

        describe('change balance to 11,000 to force invalid form ', () => {

            before(() => {
                cy.getDataTestId('balance').clear().type('11000').blur();
            });

            it('fixed payment should be set to minimum which is a value of 248.69', () => {
                cy.getDataTestId('fixed-payment').should('have.value', '248.69');
            });

            // it('set fixed payment link should exist', () => {
            //     cy.getDataTestId('set-fix-payment').should('exist');
            // });
        });

        // describe('change fixed payment to 248.69 to fix validation erros', () => {
        //     before(() => {
        //         cy.getDataTestId('fixed-payment').clear().type('248.69').blur();
        //     });

        //     it('set fixed payment link should NOT exist', () => {
        //         cy.getDataTestId('set-fix-payment').should('not.exist');
        //     });

        //     it('set to minimum payment label should exist', () => {
        //         cy.getDataTestId('fix-pay-is-min').should('exist');
        //     });
        // });

        describe('change interest rate to 16% to break validation', () => {

            before(() => {
                cy.getDataTestId('interest-rate').clear().type('16').blur();
            });

            it('fixed payment should be set to minimum which is a value of 256.67', () => {
                cy.getDataTestId('fixed-payment').should('have.value', '256.67');
            });

            // it('set fixed payment link should exist', () => {
            //     cy.getDataTestId('set-fix-payment').should('exist');
            // });
        });

        // describe('change interest rate to 14% to FIX validation', () => {

        //     before(() => {
        //         cy.getDataTestId('interest-rate').clear().type('14').blur();
        //     });

        //     it('set fixed payment link NOT should exist', () => {
        //         cy.getDataTestId('set-fix-payment').should('not.exist');
        //     });

        //     it('set to minimum payment label should exist', () => {
        //         cy.getDataTestId('fix-pay-is-min').should('not.exist');
        //     });
        // });

        // describe('change interest rate to 20% to TO BREAK validation', () => {

        //     before(() => {
        //         cy.getDataTestId('interest-rate').clear().type('20').blur();
        //     });

        //     // it('set fixed payment link NOT should exist', () => {
        //     //     cy.getDataTestId('set-fix-payment').should('not.exist');
        //     // });

        //     it('set to minimum payment label should exist', () => {
        //         cy.getDataTestId('fix-pay-is-min').should('not.exist');
        //     });
        // });
    });

});