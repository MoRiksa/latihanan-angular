import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Provinsi } from './provinsi';
import {map} from 'rxjs/operators';



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
}
