import { enterProfitAnalysisForm } from "./baselineUnitAnalyisInput";

describe('gross-profit-percent-section', () => {

    before(() => {
        enterProfitAnalysisForm();
    });

    beforeEach(() => {
        cy.getDataTestId('gross-profit-percent-section').as('section');
    });

    it('section should exist', () => {
        cy.get('@section').should('exist');
    });

    it('title should be correct', () => {
        cy.get('@section').getDataTestId('title').invoke('text').then((text) => {
            expect(text.trim()).to.eq('Gross Profit Percent');
        });
    });

    it('stat or acctual result should be correct', () => {
        cy.get('@section').getDataTestId('stat').invoke('text').then((text) => {
            expect(text.trim()).to.eq('12.61%');
        });
    });

    it('formula result', () => {
        cy.get('@section').getDataTestId('formula-expanded')
            .textShouldEqual('(732,400.00 - 640,075.00) / 732,400.00');
    });

    it('formula from help should be correct', () => {
        cy.get('@section').getDataTestId('formula')
            .textShouldEqual('(revenue - expense) / revenue');
    });
});