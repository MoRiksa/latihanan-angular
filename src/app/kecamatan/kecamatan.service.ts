import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Kecamatan } from './kecamatan';
import { Kabupaten } from '../kabupaten/kabupaten';
import {map} from 'rxjs/operators';

@Injectable()
export class KecamatanService {

  constructor(private httpKlien: HttpClient) { }
  insertKec(kecamatan: Kecamatan): Observable<any>{
    return this.httpKlien.post(environment.baseUrl +'/savekecjson', kecamatan)
    .pipe(map(data => data));
  }

  listKecamatan(): Observable<Kecamatan[]>{
    return this.httpKlien.get(environment.baseUrl +'/listkecamatanjson')
    .pipe(map(data => <Kecamatan[]> data));
  }
  getKecByID(id: string): Observable<Kecamatan>{
    return this.httpKlien.get(environment.baseUrl +'/listkecamatanjson/'+id)
    .pipe(map(data => <Kecamatan> data));
  }

  listKabupaten(id: string): Observable<Kabupaten[]>{
    return this.httpKlien.get(environment.baseUrl +'/listkabjsonp/'+id)
    .pipe(map(data => <Kabupaten[]> data));
  }

}
