import { baselineBreakEven } from "./baselineUnitAnalyisInput";

describe('desired-gross-profit-happy-path', () => {

    beforeEach(() => {
        baselineBreakEven(400, 325, 45000, 60000);
    });

    it('should calculate units to be 2,000 with comma', () => {
        cy.getDataTestId('unit-profit-analysis-unit')
            .should('contain.text', "1,400 Units To Make A Gross Profit Of 60,000.00.")
    });
});