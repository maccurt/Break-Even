
import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/icon/icon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public icons: IconService) { }
}