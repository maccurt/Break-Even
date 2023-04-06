import { checkForErrors, CheckForNoErrors, checkValidation } from "./check-validation.function";

describe('intro rate fields', () => {

    before(() => {
        cy.visit('/credit-card-devil');
        cy.getDataTestId('balance').clear().type('20000').blur();
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
            //TODO ADD TEST TO CHECK FOR ERROR not being there
        });        

        it('type 2.9 and blur off it should not not show error and have 2.9 value', () => {
            cy.get('@introInterestRate').focus().clear().type('2.9').blur()
            .should('have.value','2.9');  
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
            //TODO ADD TEST TO CHECK FOR ERROR not being there
        }); 
        
        CheckForNoErrors('intro-transfer-cost-percent');            

        describe('enter 100 which is an error', () => {
            before(() => {
                cy.getDataTestId('intro-transfer-cost-percent').clear().type('100').blur();
            });
            checkForErrors('intro-transfer-cost-percent');            
        });

        xdescribe('enter 99 which is NOT an error', () => {
            before(() => {
                cy.getDataTestId('intro-transfer-cost-percent').clear().type('99.').blur();
            });
            CheckForNoErrors('intro-transfer-cost-percent');            
        });
        
    });    
});