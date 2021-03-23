import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  app: AppComponent;
  private readonly meta: MetaTagModel;

  constructor(private seoService: SeoService) {
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Home',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/'
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
  }

}
