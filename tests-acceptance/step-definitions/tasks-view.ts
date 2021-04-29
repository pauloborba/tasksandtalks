import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementFinder, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    let nowDate: string;

    Given(/^eu estou na página de projetos$/, async () => {
        await browser.get("http://localhost:4200/projetos");
        await expect(browser.getTitle()).to.eventually.equal('TntGui');
    });

    Given(/^eu posso visualizar o projeto "([^\"]*)"$/, async (name) => {
        await $("input[name='namebox']").sendKeys(<string>name);
        await $("button[name='adicionar']").click();
    });

    Given(/^eu posso seguir para a página do projeto "([^\"]*)"$/, async (name) => {
        await element(by.linkText(<string>name)).click();
    });

    Given(/^eu posso visualizar uma tarefa "([^\"]*)"$/, async (name) => {
        await $("input[name='descbox']").sendKeys(<string>name);
        await $("input[name='datebox']").sendKeys(Date.now());
        await $("button[name='adicionar']").click();
    });

    Given(/^eu posso seguir para a página da tarefa "([^\"]*)"$/, async (name) => {
        await element(by.linkText(<string>name)).click();
    });

    Given(/^eu estou na página da tarefa "([^\"]*)"$/, async (taskName) => {
        const taskTitle = element(by.id('tarefa-titulo'));
        await expect(taskTitle.getText()).to.eventually.equal(taskName);
    });

    When(/^eu indico a atualização das informações da tarefa$/, async () => {
        await element(by.buttonText('Atualizar')).click();
        nowDate = `${new Date(Date.now()).toISOString().substr(0, 10).split('-').reverse().join('/')} - ${new Date(Date.now()).toLocaleTimeString('en-US')}`;
    });

    Then(/^eu vejo a data atual na coluna "([^\"]*)"$/, async (columnName) => {
        let tableData = await element(by.id("tabela-atualizacao"));
        let rows = await tableData.all(by.tagName("tr"));

        await expect(rows.length).to.equal(2);
        await expect(rows[0].getText()).to.eventually.equal(columnName);
        await expect(rows[1].getText()).to.eventually.equal(nowDate);
    });
});