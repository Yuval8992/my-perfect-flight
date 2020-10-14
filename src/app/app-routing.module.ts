import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlightSearchContainerComponent } from './flight-search-container/flight-search-container.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/flight-search', pathMatch: 'full' },
  {
    path: 'flight-search',
    component: FlightSearchContainerComponent,
  },
  {
    path: 'flights',
    component: FlightListComponent,
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
