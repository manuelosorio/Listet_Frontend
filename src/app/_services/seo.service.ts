import { Injectable, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { MetaTagModel } from '@models/metatag.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService implements OnDestroy {
  constructor(private meta: Meta, private title: Title) {}

  updateInfo(metaData: MetaTagModel) {
    this.title.setTitle(metaData.title);
    this.meta.updateTag({ name: 'description', content: metaData.description });
    this.meta.updateTag({ name: 'author', content: metaData.author });
    /*Open Graph - Facebook, Google, LinkedIn*/
    this.meta.updateTag({ property: 'og:type', content: 'Website' });
    this.meta.updateTag({ property: 'og:title', content: metaData.title });
    this.meta.updateTag({
      property: 'og:description',
      content: metaData.description,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: metaData.openGraphImage,
    });
    this.meta.updateTag({ property: 'og:url', content: metaData.url });
    this.meta.updateTag({ property: 'og:site_name', content: 'Listet App' });
    /*Twitter Meta Content*/
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: metaData.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: metaData.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: metaData.twitterImage,
    });
    this.meta.updateTag({ name: 'twitter:site', content: '@theManuelOsorio' });
    this.meta.updateTag({
      name: 'twitter:creator',
      content: '@theManuelOsorio',
    });
  }

  removeMeta() {
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='author'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
  }

  ngOnDestroy(): void {
    this.removeMeta();
  }
}
