import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class LembretedeConversasService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private tntURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  criarLembrete(lembreteDeData : [number, string]): Observable<boolean> {
    return this.http.post<any>(this.tntURL + "/lembreteconversation", lembreteDeData, {headers: this.headers})
      .pipe( 
        retry(2),
        map( res => {if (res.success) {return true;} else {return false;}} )
      ); 
  }

  getData(): Observable < (number[] | string[])[]> {
    return this.http.get<(number[] | string[])[]>(this.tntURL + "/datas")
    .pipe(
        retry(2)
      );
  }
  
}