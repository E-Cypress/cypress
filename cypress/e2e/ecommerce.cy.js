describe('E-Commerce App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('displays the product list', () => {
      cy.get('[data-cy=product-grid]').should('be.visible');
      cy.get('[data-cy=product-item]').should('have.length.at.least', 1);
    });
  
    it('displays product details correctly', () => {
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=product-name]').should('be.visible');
        cy.get('[data-cy=product-price]').should('be.visible');
        cy.get('[data-cy=product-image]').should('be.visible');
        cy.get('[data-cy=add-to-cart-button]').should('be.visible');
      });
    });
  
    it('adds a product to the cart when clicking Add to Cart', () => {
      // Store the product name for later comparison
      let productName;
      
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=product-name]').invoke('text').then(text => {
          productName = text;
        });
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      cy.get('[data-cy=cart-item]').should('have.length', 1);
      cy.get('[data-cy=cart-item-name]').first().should('have.text', productName);
      cy.get('[data-cy=item-quantity]').first().should('have.text', '1');
    });
  
    it('increases quantity when adding same product multiple times', () => {
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').click();
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      cy.get('[data-cy=cart-item]').should('have.length', 1);
      cy.get('[data-cy=item-quantity]').first().should('have.text', '2');
    });
  
    it('increases and decreases quantity in cart', () => {
      // Add product to cart first
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      // Increase quantity
      cy.get('[data-cy=increase-quantity]').click();
      cy.get('[data-cy=item-quantity]').should('have.text', '2');
  
      // Decrease quantity
      cy.get('[data-cy=decrease-quantity]').click();
      cy.get('[data-cy=item-quantity]').should('have.text', '1');
    });
  
    it('removes an item from the cart', () => {
      // Add product to cart first
      cy.get('[data-cy=product-item]').first().within(() => {
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      // Click remove button
      cy.get('[data-cy=remove-item]').click();
      cy.get('[data-cy=empty-cart-message]').should('be.visible');
      cy.get('[data-cy=cart-item]').should('not.exist');
    });
  
    it('calculates cart total correctly', () => {
      // Add first product to cart
      let firstPrice;
      let secondPrice;
      
      cy.get('[data-cy=product-item]').eq(0).within(() => {
        cy.get('[data-cy=product-price]').invoke('text').then(text => {
          firstPrice = parseFloat(text.replace('$', ''));
        });
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      // Add second product to cart
      cy.get('[data-cy=product-item]').eq(1).within(() => {
        cy.get('[data-cy=product-price]').invoke('text').then(text => {
          secondPrice = parseFloat(text.replace('$', ''));
        });
        cy.get('[data-cy=add-to-cart-button]').click();
      });
  
      // Verify total is correct
      cy.get('[data-cy=cart-total]').invoke('text').then(text => {
        const total = parseFloat(text.replace('Total: $', ''));
        const expectedTotal = firstPrice + secondPrice;
        expect(total).to.be.closeTo(expectedTotal, 0.01);
      });
    });
  });