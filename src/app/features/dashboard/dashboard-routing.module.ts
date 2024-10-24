import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'home',
    loadChildren:()=>import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path:'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path:'cursos',
    loadChildren:()=> import('./cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path:'inscripciones',
    loadChildren:()=> import('./inscripciones/inscripciones.module').then(m => m.InscripcionesModule),
  },
  {
    path:'***',
    redirectTo:'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
