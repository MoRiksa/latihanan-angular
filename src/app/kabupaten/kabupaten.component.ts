import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KabupatenService } from './kabupaten.service';
import { Kabupaten } from './kabupaten';
import { Provinsi } from '../propinsi/provinsi';
import { PropinsiService } from '../propinsi/propinsi.service'

@Component({
  selector: 'app-kabupaten',
  templateUrl: './kabupaten.component.html',
  styleUrls: ['./kabupaten.component.css'],
  providers: [KabupatenService,PropinsiService]
})
export class KabupatenComponent implements OnInit {

  addKabForm: FormGroup;
  listProv : Provinsi[];

  constructor(private kabupatenService : KabupatenService, private propinsiService : PropinsiService) { }

  ngOnInit(): void {
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

