import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KecamatanService } from './kecamatan.service';
import { Kecamatan } from './kecamatan';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';




@Component({
  selector: 'app-kecamatan',
  templateUrl: './listkecamatan.component.html',

  providers: [KecamatanService]
})
export class ListKecamatanComponent implements OnInit, AfterViewInit {

  dtElement : DataTableDirective;
  dtOptions : any = {};
  dtTrigger : Subject<any> = new Subject();

  // listKec: Kecamatan[];

  constructor(private kecamatanService : KecamatanService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    const that = this;
    this.dtOptions = {
      ajax : (dataTableParameters: any, callback) => {
        const parameters = new Map<string, any>();
        that.kecamatanService.getAllKecamatan(parameters, dataTableParameters).subscribe ( resp =>  {
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: resp.data,
            draw: resp.draw
          });
        });
      },
      serverSide: true,
      processing: true,
      filter: false,
      columns: [{
        title: 'ID',
        data: 'kodeBPS'
      },{
        title: 'Nama',
        data: 'namaKecamatan'
      },
      {
        title: 'Nama Provinsi',
        data: 'namaProvinsi'
      },
      {
        title: 'Nama Kabupaten',
        data: 'namaKabupaten'
      },
      {
        title: 'Action',
        orderable: false,
        render(data, type, row){
          return `<a href="ekecamatan/${row.kodeBPS}" class="btn btn-dark btn-default edit" data-element-id="${row.kodeBPS}">
          <i class="glyphicon glyphicon-edit"><i> Edit </a>`;
        }
      }],
      rowCallback(row, data, dataIndex){
        const idx = ((this.api().page()) * this.api().page.len()) + dataIndex + 1;
        $('td:eq(0)', row).html('<b>' + idx + '</b>');
    }

    }

}
ngAfterViewInit(){

  }
}

