import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PropinsiService } from './propinsi.service';
import { Provinsi } from './provinsi';

@Component({
  selector: 'app-listprov',
  templateUrl: './propinsilist.component.html',
  providers: [PropinsiService]
})
export class PropinsilistComponent implements OnInit, AfterViewInit {
  
  listProv: Provinsi[];

  constructor(private propinsiService : PropinsiService) { }

  ngOnInit(): void {
    this.propinsiService.listProvinsi().subscribe ((data) => {
        this.listProv = data;
    }, error => {
        console.log(error);
    });

  }
  ngAfterViewInit(){

  }

}
