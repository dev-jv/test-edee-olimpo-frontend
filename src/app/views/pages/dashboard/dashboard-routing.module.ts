import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const childrenRoutes: Routes = [
  { path: '', redirectTo: 'ratings', pathMatch: 'full' },
  {
    path: 'ratings',
    loadChildren: () => import('./ratings/ratings.module').then(m => m.RatingsModule)
  },
];

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: childrenRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
