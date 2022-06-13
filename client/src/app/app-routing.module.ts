import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'garage',
    loadChildren: () => import('./modules/garage/garage.module').then(m => m.GarageModule)
  },
  {
    path: '',
    redirectTo: 'garage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
