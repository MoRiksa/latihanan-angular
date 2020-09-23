import {Provinsi} from '../propinsi/provinsi'
import {Kabupaten} from '../kabupaten/kabupaten'
export class Kecamatan {
    kodeBPS : number;
    namaKecamatan : string;
    idKabupaten : number;
    kabupaten : Kabupaten;
    idProvinsi : number;
    provinsi : Provinsi;
}