/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
    namespace Cypress {
        interface Chainable {
            getDataTestId(attribValue: string)
                : Chainable<JQuery<HTMLElement>>;
        }
    }
};

const getDataTestId = (subject: JQuery<HTMLElement>, attribValue: string): Cypress.Chainable<JQuery<HTMLElement>> => {
    if (subject) {
        return cy.wrap(subject).find(`[data-test-id=${attribValue}]`);
    }
    return cy.get(`[data-test-id=${attribValue}]`);
}

Cypress.Commands.add('getDataTestId', { prevSubject: ['optional'] } as any, getDataTestId);

export { }