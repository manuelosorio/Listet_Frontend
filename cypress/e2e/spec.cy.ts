describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.get('title').should('contain', 'Listet');
  });
});
