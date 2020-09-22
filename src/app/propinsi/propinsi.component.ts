import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropinsiService } from './propinsi.service';
import { Provinsi } from './provinsi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-propinsi',
  templateUrl: './propinsi.component.html',
  styleUrls: ['./propinsi.component.css'],
  providers: [PropinsiService]
})
export class PropinsiComponent implements OnInit {
  id : string;
  addProvinsiForm: FormGroup;

  constructor(private propinsiService : PropinsiService, private route: ActivatedRoute) { 
    this.addProvinsiForm = new FormGroup({
      "idProvinsi" : new FormControl(null, [Validators.required]),
      "namaProvinsi" : new FormControl(null,[Validators.required]) 
    });
  }

  ngOnInit(): void { 
      this.route.params.subscribe(rute => {
      this.id = rute.id;
      this.propinsiService.listProvinsibyID(this.id).subscribe(data => {
        this.addProvinsiForm.get('idProvinsi').setValue(data.idProvinsi);
        this.addProvinsiForm.get('namaProvinsi').setValue(data.namaProvinsi);
      }, error => {
        alert("Data tidak ditemukan!");
      });
      });

  }

  simpanProv(): void{
    console.log(this.addProvinsiForm.value);
    let prov = new Provinsi();
    prov.idProvinsi = this.addProvinsiForm.value.idProvinsi;
    prov.namaProvinsi = this.addProvinsiForm.value.namaProvinsi;
    this.propinsiService.insertProv(prov).subscribe((data) => {
      console.log(data);
    });

  }

}
