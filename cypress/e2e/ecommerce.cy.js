describe('Funcionalidade do Carrinho de Compras E-Commerce', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('demonstra o fluxo completo do carrinho de compras', () => {

      // bota um produto no carrinho
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=product-name]').invoke('text').as('nomePrimeiroProduto');
        cy.get('[data-cy=add-to-cart-button]').click();
      });
      
      // verifica se o produto ta no carrinho
      cy.get('[data-cy=cart-item]').should('have.length', 1);
      cy.get('[data-cy=item-quantity]').should('have.text', '1');
      
      // adicionar o produto mais 2 vezes
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').click();
        cy.get('[data-cy=add-to-cart-button]').click();
      });
      
      // ver se o total agora n ocarrinho e 3
      cy.get('[data-cy=item-quantity]').should('have.text', '3');
      
      // adiciona outro produto
      cy.get('[data-cy=product-item]').eq(1).within(() => {
        cy.get('[data-cy=product-name]').invoke('text').as('nomeSegundoProduto');
        cy.get('[data-cy=add-to-cart-button]').click();
      });
      
      // ver se tem dois produtos diferentes no carrinho
      cy.get('[data-cy=cart-item]').should('have.length', 2);
      
      // tirar o primeiro produto, todos os 3 do primeiro produto
      cy.get('@nomePrimeiroProduto').then(nomePrimeiroProduto => {
        cy.get('[data-cy=cart-item-name]').contains(nomePrimeiroProduto)
          .parents('[data-cy=cart-item]')
          .find('[data-cy=remove-item]')
          .click();
      });
      
      // verifica se so sobrou o segundo produto
      cy.get('[data-cy=cart-item]').should('have.length', 1);
      cy.get('@nomeSegundoProduto').then(nomeSegundoProduto => {
        cy.get('[data-cy=cart-item-name]').should('have.text', nomeSegundoProduto);
      });
      
      // clicar o botao de mais pra aumentar a quantidade do segundo produto pra 2
      cy.get('[data-cy=increase-quantity]').click();
      
      // ver se tem 2 do segundo produto
      cy.get('[data-cy=item-quantity]').should('have.text', '2');
    });
  });