import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Chat } from '../../../common/chat';

@Injectable()
export class ContextoService {
    private headers = new HttpHeaders({'Content-Type': 'application/json'})
    private tntURL = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getChat(): Observable<Chat[]> {
        return this.http.get<Chat[]>(this.tntURL + "/chat")
              .pipe(
                 retry(2)
               );
    }

    criar(aluno: Aluno): Observable<Aluno> {
        return this.http.post<any>(this.taURL + "/aluno", aluno, {headers: this.headers})
                 .pipe( 
                    retry(2),
                    map( res => {if (res.success) {return aluno;} else {return null;}} )
                  ); 
      }

}