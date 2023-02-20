import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ContactService } from './services/contact.service';
import { BitcoinService } from './services/bitcoin.service';
import { UserService } from './services/user.service';

import { AppComponent } from './app-root/app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { LineChartComponent } from './cmps/line-chart/line-chart.component';
import { BarChartComponent } from './cmps/bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactIndexComponent,
    ContactDetailsComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    StatsPageComponent,
    ContactEditComponent,
    HomePageComponent,
    AppHeaderComponent,
    LineChartComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ContactService, UserService, BitcoinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
