describe('break-even validation', () => {

  before(() => {
    cy.visit('/break-even');
  })

  describe('revenue per unit', () => {

    beforeEach(()=>{
      cy.getDataTestId('revenue-per-unit').as('input');
    })    

    it('should have error when clear and blur', () => {
      cy.get('@input').clear().blur();
      cy.get('@input').parent().should('have.class', 'has-error');
    })

    it('should not have error when 2 ', () => {
      cy.get('@input').clear().type('2').blur();
      cy.get('@input').parent().should('not.have.class', 'has-error');
    })
  });

  describe('variableExpense', () => {

    beforeEach(()=>{
      cy.getDataTestId('variable-expense').as('input');
    })
    
    it('should have error when clear and blur', () => {
      cy.get('@input').clear().blur();
      cy.get('@input').parent().should('have.class', 'has-error');
    })    

    it('should have error when 2 = to revenue ', () => {
      cy.get('@input').clear().type('2').blur();
      cy.get('@input').parent().should('have.class', 'has-error');
    })

    it('should not have error when 1 ', () => {
      cy.get('@input').clear().type('1');
      cy.get('@input').parent().should('not.have.class', 'has-error');
    })
  });

  describe('fixed expense', () => {

    beforeEach(()=>{
      cy.getDataTestId('fixed-expense').as('input');
    })

    it('should exist', () => {
      cy.get('@input').should('exist');
    })

    it('should have error when clear and blur', () => {
      cy.get('@input').clear().blur();
      cy.get('@input').parent().should('have.class', 'has-error');
    })

    it('should not have error when 2 ', () => {
      cy.get('@input').type('2');
      cy.get('@input').parent().should('not.have.class', 'has-error');
    })

  });  

  it('calulate button should exist', () => {
    cy.getDataTestId('calculate-break-even').should('exist');
  })
})