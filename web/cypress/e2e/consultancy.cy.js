import { personal, company } from "../fixtures/consultancy.json";

Cypress.Commands.add("fillConsultancyForm", (form) => {
  cy.get('input[placeholder="Digite seu nome completo"]').type(form.name);

  cy.get('input[placeholder="Digite seu email"]').type(persoformnal.email);

  cy.get('input[placeholder="(00) 00000-0000"]').type(form.phone);
  //.should("have.value", form.phone);

  cy.contains("label", "Tipo de Consultoria")
    .parent()
    .find("select")
    .select(form.consultancyType);

  cy.contains("label", "Pessoa Física")
    .find("input")
    .click()
    .should("be.checked");

  cy.contains("label", "Pessoa Jurídica")
    .find("input")
    .should("be.not.checked");

  cy.contains("label", "CPF").parent().find("input").type(form.personType);
  //.should("have.value", form.cpf);

  form.discoveryChannels.forEach((channel) => {
    cy.contains("label", channel).find("input").check().should("be.checked");
  });

  cy.get('input[type="file"]').selectFile(form.file, {
    force: true,
  });

  cy.get(
    'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
  ).type(form.description);

  form.techs.forEach((tech) => {
    cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
      .type(tech)
      .type("{Enter}");

    cy.contains("label", "Tecnologias")
      .parent()
      .contains("span", tech)
      .should("be.visible");
  });

  if (form.terms === true) {
    cy.contains("label", "termos de uso").find("input").check();
  }
});

describe("Formulário de consultoria", () => {
  beforeEach(() => {
    cy.login();
    cy.goTo("Formulários", "Consultoria");
  });

  it("Deve solicitar consultoria individual", () => {
    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 6000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
      );
  });

  it("Deve solicitar consultoria In Company", () => {
    cy.get('input[placeholder="Digite seu nome completo"]').type(company.name);

    cy.get('input[placeholder="Digite seu email"]').type(company.email);

    cy.get('input[placeholder="(00) 00000-0000"]').type(company.phone);
    //.should("have.value", company.phone);

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select(company.consultancyType);

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .should("be.not.checked");

    cy.contains("label", "CNPJ").parent().find("input").type(company.document);
    //.should("have.value", company.cpf);

    company.discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    cy.get('input[type="file"]').selectFile(company.file, {
      force: true,
    });

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(company.description);

    company.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{Enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    if (company.terms === true) {
      cy.contains("label", "termos de uso").find("input").check();
    }

    cy.contains("button", "Enviar formulário").click();

    cy.get(".modal", { timeout: 6000 })
      .should("be.visible")
      .find(".modal-content")
      .should("be.visible")
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido."
      );
  });

  it("Deve verificar os campos obrigatorios", () => {
    cy.contains("button", "Enviar formulário").click();

    cy.contains("label", "Nome Completo")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "Email")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Campo obrigatório")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");

    cy.contains("label", "termos de uso")
      .parent()
      .find("p")
      .should("be.visible")
      .should("have.text", "Você precisa aceitar os termos de uso")
      .and("have.class", "text-red-400")
      .and("have.css", "color", "rgb(248, 113, 113)");
  });

  afterEach(() => {
    cy.log("Isso acontece acontece depois de cada teste");
  });
});
