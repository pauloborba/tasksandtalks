import { Projeto } from '../../common/projeto'
import { ProjetoService } from '../../tnt-gui/src/app/projetos.service'

describe("O nível de sobrecarga", () => {
    var projeto: Projeto;
    var projetoService: ProjetoService;

    beforeEach(() => {
        projeto = new Projeto(false);
        projetoService = new ProjetoService();
    })

    it("calcula sobrecarga corretamente", () => {
        projeto.setQuantidadeTarefas(5);
        projeto.setEmailsNaoLidos(5);
        projeto.setChatsNaoLidos(5);
        expect(projeto.getSobrecarga(2, 1, 1)).toBe(5);   
    })

    it("calcula nível de sobrecarga relativo corretamente", () => {
        //Adicionar projeto
        var sobrecarga: number[] = [10, 20, 30, 40];

        projeto.sobrecarga = sobrecarga[0];
        projetoService.criar(projeto);       

        projeto.sobrecarga = sobrecarga[1];
        projetoService.criar(projeto);

        projeto.sobrecarga = sobrecarga[2];
        projetoService.criar(projeto);

        projeto.sobrecarga = sobrecarga[3];
        projetoService.criar(projeto);

        expect(projetoService.getIndexFromSobrecarga(sobrecarga[0])).toBe(-1);
        expect(projetoService.getIndexFromSobrecarga(sobrecarga[1])).toBe(-1);
        expect(projetoService.getIndexFromSobrecarga(sobrecarga[2])).toBe(0);
        expect(projetoService.getIndexFromSobrecarga(sobrecarga[3])).toBe(1);
    })
})