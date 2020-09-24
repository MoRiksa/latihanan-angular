import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PropinsiService } from './propinsi.service';
import { Provinsi } from './provinsi';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listprov',
  templateUrl: './propinsilist.component.html',
  providers: [PropinsiService]
})
export class PropinsilistComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild(DataTableDirective,{static: false})
  dtElement : DataTableDirective;
  dtOptions : any = {};
  dtTrigger : Subject<any> = new Subject();
  cariForm: FormGroup;

  // listProv: Provinsi[];

  constructor(private propinsiService : PropinsiService) { }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

    this.cariForm = new FormGroup ({
      namaProvinsi: new FormControl()
    });


    // this.propinsiService.listProvinsi().subscribe ((data) => {
    //     this.listProv = data;
    // }, error => {
    //     console.log(error);
    // });

    const that = this;
    this.dtOptions = {
      ajax : (dataTableParameters: any, callback) => {
        const parameters = new Map<string, any>();
        parameters.set('namaProvinsi', this.cariForm.controls.namaProvinsi.value);
        that.propinsiService.getAllProvinsi(parameters, dataTableParameters).subscribe ( resp =>  {
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
        data: 'idProvinsi'
      },{
        title: 'Nama',
        data: 'namaProvinsi'
      },{
        title: 'Action',
        orderable: false,
        render(data, type, row){
          return `<a href="editprov/${row.idProvinsi}" class="btn btn-dark btn-default edit" data-element-id="${row.idProvinsi}">
          <i class="glyphicon glyphicon-edit"><i> Edit </a>`;
        }
      }],
      rowCallback(row, data, dataIndex){
        const idx = ((this.api().page()) * this.api().page.len()) + dataIndex + 1;
        $()
      }

    }

  }
  ngAfterViewInit(){

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance : DataTables.Api) => {
      dtInstance.draw();
    });
  }

}
