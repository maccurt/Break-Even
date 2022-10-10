import { IconModule } from './../icon/icon.module';
import { MaterialModule } from './../material/material.module';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    IconModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
