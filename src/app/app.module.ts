import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PropinsiComponent } from './propinsi/propinsi.component'
import { HttpClientModule } from '@angular/common/http';
import { PropinsilistComponent } from './propinsi/propinsilist.component';
import { KabupatenComponent } from './kabupaten/kabupaten.component';
import { ListKabupatenComponent } from './kabupaten/listkabupaten.component';
import { KecamatanComponent } from './kecamatan/kecamatan.component';
import { ListKecamatanComponent } from './kecamatan/listkecamatan.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PropinsiComponent,
    PropinsilistComponent,
    KabupatenComponent,
    ListKabupatenComponent,
    KecamatanComponent,
    ListKecamatanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
