import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta) { }

  addTitle = (title: string) => {
    this.meta.removeTag('name="twitter:title"');
    this.meta.addTag({ name: 'twitter:title', content: title }, true);

    this.meta.removeTag('property="og:title"');
    this.meta.addTag({ property: 'og:title', content: title }, true);
  };

  addDescription = (description: string) => {
    this.meta.removeTag('name="description"');
    this.meta.addTag({ name: 'description', content: description }, true);

    this.meta.removeTag('property="og:description"');
    this.meta.addTag({ property: 'og:description', content: description }, true);

    this.meta.removeTag('property="twitter:description"');
    this.meta.addTag({ property: 'twitter:description', content: description }, true);
  };

}
