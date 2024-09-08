import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchDataService } from '@shared/search-data.service';
import { ListComponent } from '@components/list/list.component';
import { environment } from '@environments/environment';
import { MetaTagModel } from '@models/metatag.model';
import { SeoService } from '@services/seo.service';
import { ListsService } from '@services/lists.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  imports: [ListComponent, RouterLink],
  providers: [SeoService, ListsService, HttpClient, SearchDataService],
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
