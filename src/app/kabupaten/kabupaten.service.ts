import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Kabupaten } from './kabupaten';
import {map} from 'rxjs/operators';
import { Datatablesrequest } from '../model/datatabkesrequest.model';
import { Datatablesresponse } from '../model/datatablesresponse.model';

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
    getKabupatenID(id): Observable<Kabupaten>{
      return this.httpKlien.get(environment.baseUrl +'/listkabjson/'+id)
      .pipe(map(data => <Kabupaten> data));
    }

    getAllKabupaten(parameter: Map<string, any>, datatableParameters: any): Observable<Datatablesresponse>{
      const param = new Datatablesrequest();
      param.draw = datatableParameters.draw;
      param.length = datatableParameters.length;
      param.start = datatableParameters.start;
      param.sortCol = datatableParameters.order[0].column;
      param.sortDir = datatableParameters.order[0].dir;
  
      parameter.forEach((value, key) =>{
        param.extraParam[key]= value ;
      });
      return this.httpKlien.post(environment.baseUrl +'/listkabdatajson/', param)
      .pipe(map(data => data as Datatablesresponse));
    }
}
