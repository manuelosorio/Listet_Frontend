import { Injectable } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {MetaTagModel} from '../models/metatag.model';

@Injectable({
  providedIn: 'root'
})

export class SeoService {
  constructor(private meta: Meta, private title: Title) {}

  updateInfo(metaData: MetaTagModel){
    this.title.setTitle(metaData.title);
    this.meta.updateTag({name: 'description', content: metaData.description});
    this.meta.updateTag({name: 'author', content: metaData.author});
    /*Open Graph - Facebook, Google, LinkedIn*/
    this.meta.updateTag({name: 'og:type', content: 'Article'});
    this.meta.updateTag({name: 'og:description', content: metaData.description});
    this.meta.updateTag({name: 'og:image', content: metaData.image});
    this.meta.updateTag({name: 'og:url', content: metaData.url});
    this.meta.updateTag({property: 'og:site_name', content: 'Listet App'});
    /*Twitter Meta Content*/
    this.meta.updateTag({name: 'twitter:title', content: metaData.title});
    this.meta.updateTag({name: 'twitter:description', content: metaData.description});
    this.meta.updateTag({name: 'twitter:image', content: metaData.image});
    this.meta.updateTag({name: 'twitter:site', content: '@theManuelOsorio'});
    this.meta.updateTag({name: 'twitter:creator', content: '@theManuelOsorio'});
  }
}
