import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Kecamatan } from './kecamatan';
import { Kabupaten } from '../kabupaten/kabupaten';
import {map} from 'rxjs/operators';
import { Datatablesrequest } from '../model/datatabkesrequest.model';
import { Datatablesresponse } from '../model/datatablesresponse.model';

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

  getAllKecamatan(parameter: Map<string, any>, datatableParameters: any): Observable<Datatablesresponse>{
    const param = new Datatablesrequest();
    param.draw = datatableParameters.draw;
    param.length = datatableParameters.length;
    param.start = datatableParameters.start;
    param.sortCol = datatableParameters.order[0].column;
    param.sortDir = datatableParameters.order[0].dir;

    parameter.forEach((value, key) =>{
      param.extraParam[key]= value ;
    });
    return this.httpKlien.post(environment.baseUrl +'/listkecjson/', param)
    .pipe(map(data => data as Datatablesresponse));
  }

}
