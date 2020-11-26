import { Projeto } from '../../common/projeto'
import { ProjetoService } from '../../tnt-gui/src/app/projetos.service'

function setSobrecargaDeProjeto(projeto: Projeto, sobrecarga: number){
    projeto.sobrecarga = sobrecarga;
    return projeto;
}

describe("O nível de sobrecarga", () => {
    var projeto: Projeto;
    var projetoService: ProjetoService;

    beforeEach(() => {
        projeto = new Projeto(true);
        projetoService = new ProjetoService();
    })

    it("calcula sobrecarga corretamente", () => {
        projeto.setQuantidadeTarefas(5);
        projeto.setEmailsNaoLidos(5);
        projeto.setChatsNaoLidos(5);
        expect(projeto.getSobrecarga(2, 1, 1)).toBe(5);   
    })

    it("calcula nível de sobrecarga relativo corretamente", () => {
        var sobrecarga: number[] = [10, 20, 30, 40];
        var expectedValues: number[] = [-1, -1, 0, 1];

        for(let i = 0; i < sobrecarga.length; i++){
            projetoService.criar(setSobrecargaDeProjeto(projeto, sobrecarga[i]));
        }

        for(let i = 0; i < sobrecarga.length; i++){
            expect(projetoService.getIndexFromSobrecarga(sobrecarga[i])).toBe(expectedValues[i]);
        }
    })
})