describe('Login', () => {
  it('Deve logar com sucesso', () => { 
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

  it('Não deve logar com a senha inválida', () => { 
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com o email inválido', () => {
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana123')

    cy.contains('button', 'Entrar').click()

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })

  it('Não deve logar com o email e senha inválido', () => { 
    cy.start()
    cy.submitLoginForm('404@webdojo.com', 'katana321')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')
  })
})