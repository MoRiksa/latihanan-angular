import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropinsiComponent } from './propinsi/propinsi.component';
import { AboutComponent } from './about/about.component';
import { PropinsilistComponent } from './propinsi/propinsilist.component';
import { KabupatenComponent } from './kabupaten/kabupaten.component';
import { ListKabupatenComponent } from './kabupaten/listkabupaten.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/home",
    pathMatch:"full"
  },

  {
    path:"about",
    component:AboutComponent
  },
  {
    path:"fprovinsi",
    component:PropinsiComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"listprovinsi",
    component:PropinsilistComponent
  },
  {
    path:"listkab",
    component:ListKabupatenComponent
  },
  {
    path:"fkabupaten",
    component:KabupatenComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
