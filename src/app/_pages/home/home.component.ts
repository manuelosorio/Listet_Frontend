import { Component, OnInit } from '@angular/core';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { environment } from '../../../environments/environment';
import { ListComponent } from '../../_components/list/list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  imports: [ListComponent, RouterLink],
  standalone: true,
})
export class HomeComponent implements OnInit {
  private readonly meta: MetaTagModel;

  constructor(private seoService: SeoService) {
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Home',
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/`,
    };
  }

  ngOnInit(): void {
    this.seoService.updateInfo(this.meta);
  }
}
