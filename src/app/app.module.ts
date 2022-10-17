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
import { StatSectionComponent } from './controls/stat-section/stat-section.component';
import { CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BreakEvenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule,
    IconModule,
    HomeModule,
    CreditCardModule,
    ControlsModule
  ],  
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
