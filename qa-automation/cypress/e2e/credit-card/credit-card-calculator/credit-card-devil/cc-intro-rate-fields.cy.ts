import { checkForErrors, CheckForNoErrors as checkForNoErrors, checkValidation } from "./check-validation.function";

describe('intro rate fields', () => {

    before(() => {
        cy.visit('/credit-card-devil');
        cy.getDataTestId('balance').clear().type('20000').blur();
        cy.getDataTestId('has-intro-rate').check();
    });

    describe('introductory interest rate', () => {

        beforeEach(()=>{
            cy.getDataTestId('intro-interest-rate').as('introInterestRate');            
        });

        it('should exist', () => {
            cy.get('@introInterestRate').should('exist');
        });  

        it('clear and blur off it should not not show error and have 0 value', () => {
            cy.get('@introInterestRate').focus().clear().blur()
            .should('have.value','0');              
        });        

        it('type 2.9 and blur off it should not not show error and have 2.9 value', () => {
            cy.get('@introInterestRate').focus().clear().type('2.9').blur()
            .should('have.value','2.9');  
        });        

        describe('set the APR to 15 and Intro to 16', () => {
            beforeEach(()=>{
                cy.getDataTestId('interest-rate').focus().clear().type('15').blur();
                cy.getDataTestId('intro-interest-rate').focus().clear().type('16').blur();
            });

            checkForErrors('intro-interest-rate');            
        });

        describe('set the APR to 16 and Intro to 16', () => {
            beforeEach(()=>{
                cy.getDataTestId('intro-interest-rate').focus().clear().type('16');
                cy.getDataTestId('interest-rate').focus().clear().type('16');                
            });

            checkForNoErrors('intro-interest-rate');            
        });

        describe('set intro to 16 and then apr to 14 then APR to 14 ORDER MATTERS', () => {
            beforeEach(()=>{
                cy.getDataTestId('interest-rate').focus().clear().type('16').blur();                
                cy.getDataTestId('intro-interest-rate').focus().clear().type('15').blur();
                cy.getDataTestId('interest-rate').focus().clear().type('14').blur();                
            });

            checkForErrors('intro-interest-rate');            
        });

    });

    describe('how many months is your rate', () => {

        beforeEach(()=>{
            cy.getDataTestId('intro-months').as('introMonths');            
        });

        it('should exist', () => {
            cy.get('@introMonths').should('exist');
        });        

        checkValidation('intro-months');        
    });

    describe('intro transfer cost to percent intro-transfer-cost-percent', () => {

        beforeEach(()=>{
            cy.getDataTestId('intro-transfer-cost-percent').as('transferCost');            
        });

        it('should exist', () => {
            cy.get('@transferCost').should('exist');
        });          

        it('clear and blur off it should not not show error and have 0 value', () => {
            cy.get('@transferCost').focus().clear().blur()
            .should('have.value','0');              
        }); 
        
        checkForNoErrors('intro-transfer-cost-percent');            

        describe('enter 100 which is an error', () => {
            before(() => {
                cy.getDataTestId('intro-transfer-cost-percent').clear().type('100').blur();
            });
            checkForErrors('intro-transfer-cost-percent');            
        });

        describe('enter 99 which is NOT an error', () => {
            before(() => {
                cy.getDataTestId('intro-transfer-cost-percent').clear().type('99.').blur();

            });
            checkForNoErrors('intro-transfer-cost-percent');            
        });
        
    });    
});