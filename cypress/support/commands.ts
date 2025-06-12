Cypress.Commands.add('checkModalVisibility', (isModalVisible: boolean) => { 
    cy.get("[data-cy='modal']").should(`${!isModalVisible ? "not." : ""}exist`);
});

Cypress.Commands.add('clickIngredientInIndexedContainer', (index: number) => {
    cy.get("[data-cy='ingredients-items']").eq(index)
    .find("[data-cy='ingredient-container']").first()
    .find("button").click();
});

declare namespace Cypress {
    interface Chainable {
      clickIngredientInIndexedContainer(index: number): Chainable<void>;
      clickOrderHistoryOrder(index: number): Chainable<void>,
      checkModalVisibility(isModalVisible: boolean): Chainable<void>;

    }
}