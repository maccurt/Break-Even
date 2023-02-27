export function checkValidation(inputDataTestId: string) {

    beforeEach(() => {
        cy.getDataTestId(inputDataTestId).as('input');
    });

    describe('input is blank tab/blur off', () => {

        before(() => {
            cy.getDataTestId(inputDataTestId).clear().focus().blur();
        });

        it('input parent should have the class has-error', () => {
            cy.get('@input').parent().should('have.class', 'has-error');
        });

        it('input should have back-ground-color', () => {
            cy.get('@input').should('have.css', 'background-color', 'rgb(255, 230, 230)');
        });

        it('input should have reddish back-ground-color', () => {
            cy.get('@input').should('have.css', 'background-color', 'rgb(255, 230, 230)');
        });

        it('hint should have reddish color', () => {
            cy.get('@input').parent().find('.hint').should('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });

    describe('enter 1 in input and blure off', () => {

        beforeEach(() => {
            cy.getDataTestId(inputDataTestId).as('input');
        });

        it('balance parent should NOT have the class has-error', () => {
            cy.get('@input').clear().type('1').blur();
            cy.get('@input').parent().should('not.have.class', 'has-error');
        });

        it('input should NOT have back-ground-color', () => {
            cy.get('@input').should('not.have.css', 'background-color', 'rgb(255, 230, 230)');
        });

        it('input should NOT have reddish back-ground-color', () => {
            cy.get('@input').should('not.have.css', 'background-color', 'rgb(255, 230, 230)');
        });

        it('hint should NOT have reddish color', () => {
            cy.get('@input').parent().find('.hint').should('not.have.css', 'color', 'rgb(255, 0, 0)');
        });
    });
}