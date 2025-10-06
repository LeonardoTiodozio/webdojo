describe("Formulário de consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.get('input[placeholder="Digite seu nome completo"]')
    .type("Leonardo Tiodozio");

    cy.get('input[placeholder="Digite seu email"]')
    .type("leonardo@teste.com.br");

    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("55999999999")
      .should("have.value", "(55) 99999-9999");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("16103899052")
      .should("have.value", "161.038.990-52");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel)
      .find("input")
      .check()
      .should("be.checked");
    });

    cy.get('input[type="file"]')
    .selectFile("./cypress/fixtures/document.pdf", { force: true, });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec ante sodales, molestie nisi et, pulvinar mauris. Praesent vel sem convallis lacus pellentesque volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. "
    );

    const techs = [
      "Cypress",
      "Selenium",
      "WebDriverIo",
      "Playwright",
      "Robot Framework",
    ];

    techs.forEach((tech)=>{
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type('{Enter}');

      cy.contains('label', 'Tecnologias')
      .parent()
      .contains('span', tech)
      .should("be.visible");
    });

    cy.contains('label', 'termos de uso')
      .find('input')
      .check()
      .should('be.checked')

    cy.contains('button', 'Enviar formulário')
      .click()

    cy.get('.modal', { timeout: 6000})
      .should('be.visible')
      .find('.modal-content')
      .should('be.visible')
      .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
  })  

  it('Deve verificar os campos obrigatorios', () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.goTo("Formulários", "Consultoria");

    cy.contains('button', 'Enviar formulário')
      .click()

    cy.contains('label', 'Nome Completo')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    cy.contains('label', 'Email')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')
      
    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)')

    
  })
});
