import { Help } from './../help/help.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-section',
  templateUrl: './stat-section.component.html',
  styleUrls: ['./stat-section.component.scss']
})
export class StatSectionComponent  {  
  @Input() help!:Help;
  @Input() stat!:number;  
  constructor() { 

  }  
}
