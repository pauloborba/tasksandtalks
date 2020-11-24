import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class EstatisticasService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private tntURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getArquivados(): Observable<(string[] | number[])[]> {
      return this.http.get<(string[] | number[])[]>(this.tntURL + "/projetosEstat/arquivados")
                .pipe(
                   retry(2)
                 );
    }

    getAtivos(): Observable<(string[] | number[])[]> {
        return this.http.get<(string[] | number[])[]>(this.tntURL + "/projetosEstat/ativos")
                  .pipe(
                     retry(2)
                   );
    }

    getPorcentagem(returnAtivos:boolean): Observable<number[]> {
        let params = new HttpParams().set("returnAtivos",(returnAtivos.toString()));
        return this.http.get<number[]>(this.tntURL + "/projetosEstat/porcentagem"+':'+returnAtivos.toString(), {params: params})
                  .pipe(
                     retry(2)
                   );
    }

    getMediaCriacao(): Observable<number> {
        return this.http.get<number>(this.tntURL + "/dadosGerais/mediaCriacao")
                  .pipe(
                     retry(2)
                   );
    }

    getDuracaoMedia(): Observable<number> {
        return this.http.get<number>(this.tntURL + "/dadosGerais/duracaoMedia")
                  .pipe(
                     retry(2)
                   );
    }
} 