export function statSectionTest(datatestId: string,
    title: string,
    stat: string,
    content1: string = '',
    content2: string = '') {

    describe('section: ' + datatestId, () => {

        it('title should equal ' + title, () => {
            cy.getDataTestId(datatestId).getDataTestId('title').textShouldEqual(title);
        });

        it('stat should equal ' + stat, () => {
            cy.getDataTestId(datatestId).getDataTestId('stat').textShouldEqual(stat);
        });

        it('content 1 should equal ' + content1, () => {
            cy.getDataTestId(datatestId).getDataTestId('formula-expanded').textShouldEqual(content1);
        });

        it('content 2 should equal ' + content2, () => {
            cy.getDataTestId(datatestId).getDataTestId('content-2').textShouldEqual(content2);
        });

    });

}