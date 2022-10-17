import { baselineBreakEven } from "./baselineUnitAnalyisInput";

describe('net-income-happy-path.cy.ts', () => {

    beforeEach(() => {
        baselineBreakEven(400, 325, 45000, 60000,35);
    });

    it('should calculate units to be 2,000 with comma', () => {
        cy.getDataTestId('unit-profit-analysis-unit')
            .should('contain.text', "1,831 Units To Make A Net Income Of $60,000.00.");
    });
});