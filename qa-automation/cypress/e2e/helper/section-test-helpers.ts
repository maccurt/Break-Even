export function statSectionTest(parentId: string, datatestId: string,
    title: string,
    stat: string,
    content1: string = '',
    content2: string = '') {

    describe('statSectionTest: ' + datatestId, () => {

        beforeEach(()=>{
            cy.getDataTestId(parentId).getDataTestId(datatestId).as('section');
        });

        it('title should equal ' + title, () => {
            cy.get('@section').getDataTestId('title').textShouldEqual(title);
            //cy.getDataTestId(datatestId).getDataTestId('title').textShouldEqual(title);
        });

        it('stat should equal ' + stat, () => {
            cy.get('@section').getDataTestId('stat').textShouldEqual(stat);
        });

        it('content 1 should equal ' + content1, () => {
            cy.get('@section').getDataTestId('formula-expanded').textShouldEqual(content1);
        });

        it('content 2 should equal ' + content2, () => {
            cy.get('@section').getDataTestId('content-2').textShouldEqual(content2);
        });
    });
}