describe('Links abrindo nova guia/janela', () =>{
    it('Validando o atributo do link do instagram', () =>{
        cy.login()

        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Acessa link de termos de uso removendo target blank', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.contains('Formulários')
            .click()
        
        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('1. Aceitação dos Termos')
            .should('be.visible')
    })
})