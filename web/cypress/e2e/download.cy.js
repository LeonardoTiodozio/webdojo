describe('Download PDF', () => {
    it('Deve validar o conteudo do recibo em PDF', () => {
        cy.visit('https://araucariageneticabovina.com.br/arquivos/servico/pdfServico_57952bf8ca7af_24-07-2016_17-58-32.pdf')

        cy.get('[data-cy="download"]')
            .click()

        cy.task('readPdf', 'cypress/download/recibo.pdf')
            .should('contain', 'Papito Shop')
    })
})