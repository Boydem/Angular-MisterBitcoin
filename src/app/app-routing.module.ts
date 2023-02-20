import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { environment } from '../environments/environment.development';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactIndexComponent,
    children: [
      { path: 'edit/:id', component: ContactEditComponent },
      { path: 'edit', component: ContactEditComponent },
    ],
  },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'stats', component: StatsPageComponent },
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.production })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
