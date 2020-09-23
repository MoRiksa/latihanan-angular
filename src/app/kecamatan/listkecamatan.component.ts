import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KecamatanService } from './kecamatan.service';
import { Kecamatan } from './kecamatan';



@Component({
  selector: 'app-kecamatan',
  templateUrl: './listkecamatan.component.html',

  providers: [KecamatanService]
})
export class ListKecamatanComponent implements OnInit, AfterViewInit {

  listKec: Kecamatan[];

  constructor(private kecamatanService : KecamatanService) { }

  ngOnInit(): void {
    this.kecamatanService.listKecamatan().subscribe ((data) => {
      this.listKec = data;
  }, error => {
      console.log(error);
  });

}
ngAfterViewInit(){

  }
}

