import { baselineBreakEven } from "./baselineUnitAnalyisInput";

describe('break-even-happy-path', () => {

    beforeEach(() => {
        baselineBreakEven(8, 3, 10000, 0);
    });

    it('should calculate units to be 2,000 with comma', () => {
        cy.getDataTestId('unit-profit-analysis-unit')
            .should('contain.text', "2,000 Units To Break Even.");
    });
});