import { creditCardScheduleMininumPayTest } from "./cc-schedule-test";

export function minimuPayScheduleTest() {

    describe('credit card minimump pay schedule test', () => {

        before(() => {
            //TODO find better way to get to tab or remove in future;       
            //cy.get('div[role=tab]').eq(0).click();
        });

        beforeEach(() => {
            cy.getDataTestId('cc-compare-tab').as('parent');
        });        

        creditCardScheduleMininumPayTest();
    });
}