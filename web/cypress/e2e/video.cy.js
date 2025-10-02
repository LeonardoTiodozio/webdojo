describe('Rodar o video', ()=> {
    it('Deve poder rodar o video de exemplo', () =>{
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.contains('Video')
            .click()
        
        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body') 
    })
})