import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KecamatanService } from './kecamatan.service';
import { Kecamatan } from './kecamatan';
import { KabupatenService } from '../kabupaten/kabupaten.service';
import { Kabupaten } from '../kabupaten/kabupaten';
import { PropinsiService } from '../propinsi/propinsi.service';
import { Provinsi } from '../propinsi/provinsi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kecamatan',
  templateUrl: './kecamatan.component.html',
  styleUrls: ['./kecamatan.component.css'],
  providers: [KecamatanService,KabupatenService,PropinsiService]
})
export class KecamatanComponent implements OnInit {
  id : string;
  addKecForm: FormGroup;
  listProv : Provinsi[];
  listKab : Kabupaten[];
  
  constructor(
    private kecamatanService : KecamatanService, 
    private kabupatenService : KabupatenService, 
    private propinsiService : PropinsiService, 
    private route: ActivatedRoute) { 

    this.addKecForm = new FormGroup( 
      {
      "kodeBPS": new FormControl
      (null, [Validators.required]),
      "namaKecamatan": new FormControl
      (null, [Validators.required, Validators.minLength(25)]),
      "idProvinsi": new FormControl
      (null, [Validators.required]),
      "idKabupaten": new FormControl
      (null, [Validators.required])

    });

    this.propinsiService.listProvinsi().subscribe ((data) => {
      this.listProv = data;
  }, error => {
      console.log(error);
  });

    this.kabupatenService.listKabupaten().subscribe ((data) => {
      this.listKab = data;
  }, error => {
      console.log(error);
  });

  }

  ngOnInit(): void {

    this.route.params.subscribe(rute => {
      this.id = rute.id;
      this.kecamatanService.getKecByID(this.id).subscribe(data => {
        this.addKecForm.get('kodeBPS').setValue(data.kodeBPS);
        this.addKecForm.get('namaKecamatan').setValue(data.namaKecamatan);
        this.addKecForm.get('idProvinsi').setValue(data.idProvinsi);
        this.addKecForm.get('idKabupaten').setValue(data.idKabupaten);
      }, error => {
        alert("Data tidak ditemukan!");
      });
      });

  }
  
simpanKec(): void{
  console.log(this.addKecForm.value);
  let kec = new Kecamatan();
  kec.kodeBPS = this.addKecForm.value.kodeBPS;
  kec.namaKecamatan = this.addKecForm.value.namaKecamatan;
 
  kec.idKabupaten = this.addKecForm.value.idKabupaten;
  this.kecamatanService.insertKec(kec).subscribe((data) => {
    console.log(data);
  });

}

ambilKabupaten(): void{

  const id = this.addKecForm.get('idProvinsi').value;
  this.kecamatanService.listKabupaten(id).subscribe(data => {
    this.listKab = data
  });

}

}
