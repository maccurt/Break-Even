import { ChartModule } from './chart/chart.module';
import { ControlsModule } from './controls/controls.module';
import { CreditCardModule } from './credit-card/credit-card.module';
import { HomeModule } from './home-domain/home.module';
import { MaterialModule } from './material/material.module';
import { IconModule } from './icon/icon.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreakEvenComponent } from './break-even/break-even.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import { CurrencyPipe } from '@angular/common';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { TesterComponent } from './tester/tester.component';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    BreakEvenComponent,
    TesterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule, //TODO you should be able to remove this soon
    ChartModule,
    IconModule,
    HomeModule,
    CreditCardModule,
    ControlsModule,
    NgxGoogleAnalyticsModule.forRoot('G-NPS0X71K2S'),//TODO make this not do it on localhost?
    NgxGoogleAnalyticsRouterModule, StoreModule.forRoot({}, {}), FontAwesomeModule
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
