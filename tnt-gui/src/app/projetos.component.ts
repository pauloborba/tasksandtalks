import { Component, OnInit } from '@angular/core';
import { Projeto } from '../../../common/projeto';
import { ProjetoService } from './projeto.service';

@Component({
    selector: 'projetos',
    templateUrl: './projetos.component.html',
    styleUrls: ['./projetos.component.css']
  })
  
  export class ProjetosComponent implements OnInit {
    projetos: Projeto[] = []
    projeto: Projeto = new Projeto();
    nomeDuplicado: boolean = false;

    constructor(private projetoService: ProjetoService) {}

    criarProjeto(p: Projeto): void {
      if (p.nome != '') {
        this.projetoService.criar(p)
               .subscribe(
                 ar => {
                   if (ar) {
                     this.projetos.push(ar);
                     this.projeto = new Projeto();
                   } else {
                     this.nomeDuplicado = true;
                   } 
                 },
                 msg => { alert(msg.message); }
               );
      }
    };

    arquivarProjeto(projeto: Projeto): void {
      projeto.conclusao = new Date ()
      this.projetoService.atualizar(projeto)
          .subscribe(
              as => {
                  if (as) {
                      var p = this.projetos.forEach(p => {
                          if (p.nome == as.nome) {
                             p.arquivado = true
                          }
                      })
                  } else {
                      alert('Aluno não arquivado.');
                  } 
              },
              msg => { alert(msg.message); }
          );
    };

    deletarProjeto(p: Projeto): void {
      this.projetoService.deletar(p)
             .subscribe(
               as => {
                 if (as) {
                    this.projetos = this.projetos.filter(p => p.nome != as.nome)
                 } else {
                    alert('Aluno não deletado.');
                 } 
               },
               msg => { alert(msg.message); }
             );
    }

    onMove(): void {
      this.nomeDuplicado = false;
    };

    ngOnInit() {
        this.projetoService.getProjetos()
            .subscribe(
              as => { this.projetos = as.map(a => {
                  return {
                      ...a,
                      criacao: new Date(a.criacao),
                      conclusao: a.conclusao? new Date(a.conclusao) : null
                  }
              })
            },
              msg => { alert(msg.message); }
              );
    }
}