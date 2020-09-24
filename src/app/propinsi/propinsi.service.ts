import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Provinsi } from './provinsi';
import {map} from 'rxjs/operators';
import { Datatablesrequest } from '../model/datatabkesrequest.model';
import { Datatablesresponse } from '../model/datatablesresponse.model';



@Injectable()
export class PropinsiService {

  constructor(private httpKlien: HttpClient) {

   }
   
   insertProv(provinsi: Provinsi): Observable<any>{
     return this.httpKlien.post(environment.baseUrl +'/saveprovjson', provinsi)
     .pipe(map(data => data));
   }

   listProvinsi(): Observable<Provinsi[]>{
    return this.httpKlien.get(environment.baseUrl +'/listprovinsijson')
    .pipe(map(data => <Provinsi[]> data));
  }

  listProvinsibyID(id: string): Observable<Provinsi>{
    return this.httpKlien.get(environment.baseUrl +'/listprovinsijson/'+id)
    .pipe(map(data => <Provinsi> data));
  }

  getAllProvinsi(parameter: Map<string, any>, datatableParameters: any): Observable<Datatablesresponse>{
    const param = new Datatablesrequest();
    param.draw = datatableParameters.draw;
    param.length = datatableParameters.length;
    param.start = datatableParameters.start;
    param.sortCol = datatableParameters.order[0].column;
    param.sortDir = datatableParameters.order[0].dir;
    param.extraParam = {};

    parameter.forEach((value, key) =>{
      param.extraParam[key]= value ;
    });
    return this.httpKlien.post(environment.baseUrl +'/listprovdatajson/', param)
    .pipe(map(data => data as Datatablesresponse));
  }
  
}
