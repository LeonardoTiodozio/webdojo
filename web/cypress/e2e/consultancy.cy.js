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
  })  
})