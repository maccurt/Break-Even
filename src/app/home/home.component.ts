import { IconService } from './../icon/icon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  useWhatYouGot: string = 'This rule is simply leveraging what you already have. We all possess skills, passions and hobbies that we can mine for gold. Tangible objects such as books, cameras and computers we can put to good use. Past projects and documents that have valuable parts we could exploit. Find value in what you already have!';

  constructor(public icons: IconService) { }
}