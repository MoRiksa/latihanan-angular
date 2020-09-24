import {Provinsi} from '../propinsi/provinsi'
import {Kabupaten} from '../kabupaten/kabupaten'
export class Kecamatan {
    kodeBPS : number;
    namaKecamatan : string;
    idKabupaten : number;
    namaKabupaten : string;
    kabupaten : Kabupaten;
    namaProvinsi : string;
    idProvinsi : number;
    provinsi : Provinsi;
}