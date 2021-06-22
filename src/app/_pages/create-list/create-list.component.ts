import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { Router } from '@angular/router';
import { ListVisibility } from '../../helper/list-visibility';

export interface Response {
  message: string;
  url: any;
}

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.sass']
})
export class CreateListComponent implements OnInit {
  public createListForm: FormGroup;
  public allowComments;
  public visibilityOptions: ListVisibility[];
  private redirectURL;

  // errorMessage: string;
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private router: Router
  ) {
    this.createListForm = formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      description: [''],
      deadline: [''],
      visibility: [ListVisibility.public],
      allow_comments: [true],
    });
  }

  ngOnInit(): void {
    this.allowComments = true;
    this.visibilityOptions = [ListVisibility.private, ListVisibility.unlisted, ListVisibility.public]
  }

  onSubmit(data) {
    this.listService.createList(data).subscribe(async (res: Response) => {
      // const user = res.username;
      // const slug = res.slug;
      // this.router.navigate([`/list/${res.username}/${res.slug}`]);
      this.alertService.success(res.message);
      this.redirectURL = res.url;
      await this.redirect('/l/' + res.url);
    }, error => {
      this.alertService.error(`Error: ${error.status} - ${error.error.message}`);
    }, () => {
    });
  }

  allowCommentsChecked(event) {
    return this.allowComments = event.target.checked;
  }

  get title() {
    return this.createListForm.get('title');
  }
  get visibility() {
    return this.createListForm.get('visibility')
  }
  async redirect(url) {
    await this.router.navigate([url]);
  }

}
