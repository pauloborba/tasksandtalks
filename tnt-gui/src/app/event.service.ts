
import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';


import { Event } from '../../../common/event';

@Injectable()
export class EventService {
    
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    private tntURL = 'http://localhost:3000';
  
    constructor(private http: HttpClient) {}


    getEventos(): Observable<Event[]> {
        return this.http.get<Event[]>(this.tntURL + "/eventos")
            .pipe(
                retry(2)
            );
    }


}