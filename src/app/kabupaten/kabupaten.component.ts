import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KabupatenService } from './kabupaten.service';
import { Kabupaten } from './kabupaten';
import { Provinsi } from '../propinsi/provinsi';
import { PropinsiService } from '../propinsi/propinsi.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kabupaten',
  templateUrl: './kabupaten.component.html',
  styleUrls: ['./kabupaten.component.css'],
  providers: [KabupatenService,PropinsiService]
})
export class KabupatenComponent implements OnInit {
  id : string;
  addKabForm: FormGroup;
  listProv : Provinsi[];

  constructor(private kabupatenService : KabupatenService, private propinsiService : PropinsiService, private route: ActivatedRoute) { 

    this.addKabForm = new FormGroup( 
      {
      "kodeBPS": new FormControl
      (null, [Validators.required]),
      "idProvinsi": new FormControl
      (null, [Validators.required]),
      "namaKabupaten": new FormControl
      (null, [Validators.required, Validators.minLength(25)])

    });

    this.propinsiService.listProvinsi().subscribe ((data) => {
      this.listProv = data;
  }, error => {
      console.log(error);
  });
  }

  ngOnInit(): void {
    this.route.params.subscribe(rute => {
      this.id = rute.id;
      this.kabupatenService.getKabupatenID(this.id).subscribe(data => {
        this.addKabForm.get('kodeBPS').setValue(data.kodeBPS);
        this.addKabForm.get('namaKabupaten').setValue(data.namaKabupaten);
        this.addKabForm.get('idProvinsi').setValue(data.idProvinsi);
      }, error => {
        alert("Data tidak ditemukan!");
      });
      });
}

simpanKab(): void{
  console.log(this.addKabForm.value);
  let kab = new Kabupaten();
  kab.kodeBPS = this.addKabForm.value.kodeBPS;
  kab.idProvinsi = this.addKabForm.value.idProvinsi;
  kab.namaKabupaten = this.addKabForm.value.namaKabupaten;
  this.kabupatenService.insertKab(kab).subscribe((data) => {
    console.log(data);
  });

}
}

