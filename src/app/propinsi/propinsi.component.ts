import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropinsiService } from './propinsi.service';
import { Provinsi } from './provinsi';

@Component({
  selector: 'app-propinsi',
  templateUrl: './propinsi.component.html',
  styleUrls: ['./propinsi.component.css'],
  providers: [PropinsiService]
})
export class PropinsiComponent implements OnInit {
  
  addProvinsiForm: FormGroup;

  constructor(private propinsiService : PropinsiService) { }

  ngOnInit(): void {
    this.addProvinsiForm = new FormGroup( 
      {
      "idProvinsi": new FormControl
      (null, [Validators.required]),
      "namaProvinsi": new FormControl
      (null, [Validators.required, Validators.minLength(25)])

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
