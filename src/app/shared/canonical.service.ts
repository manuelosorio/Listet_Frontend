import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom) { }
  setCanonicalURL(url?: string) {
    let canonicalURL;
    if (!(this.dom.URL.indexOf('localhost') >= 0 || this.dom.URL.indexOf('127.0.0.1') >= 0)) {
      if (url === undefined) {
        canonicalURL = url;
      }
      canonicalURL = this.dom.URL;
      const link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.dom.head.appendChild(link);
      link.setAttribute('href', canonicalURL);
    }
  }
}
