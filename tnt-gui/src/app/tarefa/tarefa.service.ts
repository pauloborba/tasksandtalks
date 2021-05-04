import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Tarefa } from '../../../../common/tarefa';
import { Projeto } from '../../../../common/projeto';

@Injectable()
export class TarefaService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private tntURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getTarefa(projetoID: string, tarefaID: string): Observable<Tarefa> {
        return this.http.get<Tarefa>(this.tntURL + "/tarefas" + `/${projetoID}/${tarefaID}`)
            .pipe(
                retry(2)
            );
    }

    atualizarMensagens(projetoID: string, tarefaID: string): Observable<Tarefa> {
        return this.http.put<any>(this.tntURL + "/tarefa/mensagens", JSON.stringify({ projetoID, tarefaID }), { headers: this.headers })
            .pipe(
                retry(2),
                map(res => { if (res.success) { return res; } else { return null; } })
            );
    }

    atualizarTarefa(projetoID: string, tarefaID: string, status: string, mensagem: string): Observable<Tarefa> {
        return this.http.put<any>(this.tntURL + "/tarefa/projeto", JSON.stringify({ projetoID, tarefaID, status, mensagem }), { headers: this.headers })
            .pipe(
                retry(2),
                map(res => { if (res.success) { return res; } else { return null; } })
            );
    }

}