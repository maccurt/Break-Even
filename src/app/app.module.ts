import { MaterialModule } from './material/material.module';
import { IconModule } from './icon/icon.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreakEvenComponent } from './break-even/break-even.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { StatSectionComponent } from './stat-section/stat-section.component';

@NgModule({
  declarations: [
    AppComponent,
    BreakEvenComponent,
    HomeComponent,
    StatSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighchartsChartModule,
    IconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
