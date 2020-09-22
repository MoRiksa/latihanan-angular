import { Component, OnInit, AfterViewInit } from '@angular/core';
import { KabupatenService } from './kabupaten.service';
import { Kabupaten } from './kabupaten';



@Component({
  selector: 'app-kabupaten',
  templateUrl: './listkabupaten.component.html',

  providers: [KabupatenService]
})
export class ListKabupatenComponent implements OnInit, AfterViewInit {

  listkab: Kabupaten[];

  constructor(private kabupatenService : KabupatenService) { }

  ngOnInit(): void {
    this.kabupatenService.listKabupaten().subscribe ((data) => {
      this.listkab = data;
  }, error => {
      console.log(error);
  });

}
ngAfterViewInit(){

  }
}

