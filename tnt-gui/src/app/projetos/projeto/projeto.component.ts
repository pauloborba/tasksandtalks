import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Projeto } from '../../../../../common/projeto';
import { Tarefa } from '../../../../../common/tarefa';

import { ProjetoService } from './../projeto.service';

@Component({
    selector: 'app-projeto',
    templateUrl: './projeto.component.html',
    styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {
    public projetoID: string;
    public projeto: Projeto;

    public tarefa: Tarefa = new Tarefa();

    constructor(
        private projetoService: ProjetoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.projetoID = this.route.snapshot.paramMap.get('projetoID');

        this.projetoService.getProjetos()
            .subscribe(
                as => {
                    as.map(a => {
                        if (a.nome = this.projetoID) {
                            this.projeto = a;
                        }
                    })
                },
                msg => { alert(msg.message); }
            );
    }

    criarTarefa(t: Tarefa): void {
        if (t.descricao != '') {
            let alredyExists: boolean = false;
            this.projeto.tarefas.forEach(value => {
                if (value.descricao == t.descricao) {
                    alredyExists = true;
                }
            });
            if (!alredyExists) {
                this.projeto.tarefas.push(this.tarefa);
                this.projetoService.atualizar(this.projeto)
                    .subscribe(
                        as => {
                            if (as) {
                                this.tarefa = new Tarefa();
                            } else {
                                alert('Tarefa não adicionada');
                            }
                        },
                        msg => { alert(msg.message); }
                    );
            } else {
                alert('Já existe uma tarefa com esse nome!');
            }
        }
    }
}
