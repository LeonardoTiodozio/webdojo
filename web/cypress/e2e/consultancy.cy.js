describe('Formulário de consultoria', ()=>{
  it('Deve solicitar consultoria individual', ()=> {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.goTo('Formulários', 'Consultoria')

    cy.get('input[placeholder="Digite seu nome completo"]').type('Leonardo Tiodozio')
    cy.get('input[placeholder="Digite seu email"]').type('leonardo@teste.com.br')
    cy.get('input[placeholder="(00) 00000-0000"]')
        .type('55999999999')
        .should('have.value', '(55) 99999-9999')

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select('Individual')

    cy.contains('label', 'Pessoa Física')
      .find('input')
      .click()
      .should('be.checked')

    cy.contains('label', 'Pessoa Jurídica')
      .find('input')
      .should('be.not.checked')

    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type('16103899052')
      .should('have.value', '161.038.990-52')

    const discoveryChannels = [
      'Instagram',
      'LinkedIn',
      'Udemy',
      'YouTube',
      'Indicação de Amigo'
    ]

    discoveryChannels.forEach((channel)=>{
      cy.contains('label', channel)
      .find('input')
      .check()
      .should('be.checked')
    })
  
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/document.pdf', { force: true })
  })
})