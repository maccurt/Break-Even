import { statSectionTest } from "../../helper/section-test-helpers";
import { minimumPayment } from "./minimum-payment-function";

describe('minimum payment happy path', () => {

    minimumPayment();

    beforeEach(() => {
        cy.getDataTestId('minimum-payment-mode').as('mode');
    });

    it('minimum payment mode should exist', () => {
        cy.get('@mode').should('exist');
    });

    it('total principal and interest section should exist', () => {
        cy.get('@mode').getDataTestId('total-principal-interest').should('exist');
    });

    statSectionTest('total-principal-interest',
        'Total Principal & Interest Minium Payment Only',
        '$21,979.18',
        '10,000.00 balance + 11,979.18 interest');

    it('minimum payment interest should exist', () => {
        cy.get('@mode').getDataTestId('minimum-payment-interest').should('exist');
    });

    statSectionTest('minimum-payment-interest',
        'Minimum Payment Interest',
        '$11,979.18',
        'You will pay 119.79% in interest.');

    it('minimum payment interest should exist', () => {
        cy.getDataTestId('time-card-min-pay-section').getDataTestId('time-to-pay-debt-section').should('exist');
    });

    it('credit card are devil section should exist', () => {
        cy.getDataTestId('time-card-min-pay-section').getDataTestId('min-payment-trap').should('exist');
    });
});