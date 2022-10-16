import { MathModule } from './../math/math.module';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MathModule
  ],
  providers:[
    CurrencyPipe
  ]
})
export class SharedModule { }
