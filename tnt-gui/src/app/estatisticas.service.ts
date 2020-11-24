import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class EstatisticasService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private tntURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

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