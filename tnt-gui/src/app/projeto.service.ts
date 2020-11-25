import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Projeto } from '../../../common/projeto';

@Injectable()
export class ProjetoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private tntURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<any>(this.tntURL + "/projeto", projeto, {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.success) {return projeto;} else {return null;}} )
              ); 
  }

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.tntURL + "/projetos")
              .pipe(
                 retry(2)
               );
  }
}