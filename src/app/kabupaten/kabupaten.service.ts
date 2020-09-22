import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Kabupaten } from './kabupaten';
import {map} from 'rxjs/operators';

@Injectable()
export class KabupatenService {

  constructor(private httpKlien: HttpClient) {
  
    }

    insertKab(kabupaten: Kabupaten): Observable<any>{
      return this.httpKlien.post(environment.baseUrl +'/savekabjson', kabupaten)
      .pipe(map(data => data));
    }

    listKabupaten(): Observable<Kabupaten[]>{
      return this.httpKlien.get(environment.baseUrl +'/listkabjson')
      .pipe(map(data => <Kabupaten[]> data));
    }
    getKabupatenID(id: string): Observable<Kabupaten>{
      return this.httpKlien.get(environment.baseUrl +'/listkabjson/'+id)
      .pipe(map(data => <Kabupaten> data));
    }
}
