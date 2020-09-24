import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { KabupatenService } from './kabupaten.service';
import { Kabupaten } from './kabupaten';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-kabupaten',
  templateUrl: './listkabupaten.component.html',

  providers: [KabupatenService]
})
export class ListKabupatenComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective,{static: false})
  dtElement : DataTableDirective;
  dtOptions : any = {};
  dtTrigger : Subject<any> = new Subject();
  // listkab: Kabupaten[];

  constructor(private kabupatenService : KabupatenService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    // this.propinsiService.listProvinsi().subscribe ((data) => {
    //     this.listProv = data;
    // }, error => {
    //     console.log(error);
    // });

    const that = this;
    this.dtOptions = {
      ajax : (dataTableParameters: any, callback) => {
        const parameters = new Map<string, any>();
        that.kabupatenService.getAllKabupaten(parameters, dataTableParameters).subscribe ( resp =>  {
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
        data: 'namaKabupaten'
      },
      {
        title: 'Nama Provinsi',
        data: 'namaProvinsi'
      },{
        title: 'Action',
        orderable: false,
        render(data, type, row){
          return `<a href="ekabupaten/${row.kodeBPS}" class="btn btn-dark btn-default edit" data-element-id="${row.kodeBPS}">
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

