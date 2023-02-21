import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { environment } from '../environments/environment.development';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactResolver } from './services/contact.resolver';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './cmps/signup/signup.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactIndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: ContactEditComponent,
        resolve: { contact: ContactResolver },
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: ContactResolver },
    canActivate: [AuthGuard],
  },
  { path: 'stats', component: StatsPageComponent, canActivate: [AuthGuard] },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.production })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
