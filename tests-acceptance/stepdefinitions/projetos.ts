import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('nomelista')).getText().then(text => text === name));
let arquivado = ((elem) => elem.element(by.name('arquivadolista')).getText().then(text => text === 'Sim'));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

async function criarProjeto(name) {
    await $("input[name='namebox']").sendKeys(<string> name);
    await element(by.name('adicionar')).click();
}

async function assertTamanhoEqual(set,n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertElementsWithSameName(n,name) {
    var projetos : ElementArrayFinder = element.all(by.name('projetolista'));
    var samename = projetos.filter(elem => sameName(elem,name));
    await assertTamanhoEqual(samename,n); 
}

async function assertProjetoArquivado(n,name) {
    var projetos : ElementArrayFinder = element.all(by.name('projetolista'));
    var estaarquivado = projetos.filter(elem => pAND(sameName(elem,name),arquivado(elem)));
    await assertTamanhoEqual(estaarquivado,n); 
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I'm at the project's page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
        await $("button[name='projetos']").click();
    })

    Given(/^And I cannot see a project called "([^\"]*)" in the project's list$/, async (name) => {
        await assertElementsWithSameName(0,name); 
    });

    When(/^I try to register a project called "([^\"]*)"$/, async (name) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("button[name='adicionar']").click();
    });

    Then(/^I see that the project "([^\"]*)" is now on the project's list$/, async (name) => {
        await assertElementsWithSameName(1,name);
    });

    Given(/^And I can see a project called "([^\"]*)" in the project's list$/, async (name) => {
        await criarProjeto(name); 
        await assertElementsWithSameName(1,name); 
    });

    When(/^I try to register a new project called "([^\"]*)"$/, async (name) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("button[name='adicionar']").click();
    });

    Then(/^I see an error message$/, async () => {
        var mensagemerro : ElementArrayFinder = element.all(by.name('msgnomeexistente'));
        await assertTamanhoEqual(mensagemerro,1);
    });

    Then(/^I see that there's only one project "([^\"]*)"$/, async (name) => {
        await assertElementsWithSameName(1,name); 
    });

    Given(/^I can see a project called "([^\"]*)" in the list of projects$/, async (name) => {
        await criarProjeto(name); 
        await assertElementsWithSameName(1,name); 
    });

    When(/^I try to delete a project called "([^\"]*)"$/, async (name) => {
        await $(`button[name='deletar_${name}']`).click();
    });

    Then(/^I can see the project "([^\"]*)" is no longer in the projects's list$/, async (name) => {
        await assertElementsWithSameName(0,name);
    });

    Given(/^The project "([^\"]*)" is not archived$/, async (name) => {
        await assertProjetoArquivado(0,name); 
    });

    When(/^I try to archive the project "([^\"]*)"$/, async (name) => {
        await $(`button[name='arquivar_${name}']`).click();
    });

    Then(/^I see that the project "([^\"]*)" was archived$/, async (name) => {
        await assertProjetoArquivado(1,name); 
    });

})
