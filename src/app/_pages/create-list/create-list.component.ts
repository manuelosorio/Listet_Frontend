import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { Router } from '@angular/router';

export interface Response {
  message: string;
  url: any;
}

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html'
})
export class CreateListComponent implements OnInit {
  createListForm: FormGroup;
  isPrivate: boolean;
  allowComments;
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
      is_private: [''],
      allow_comments: [true],
    });
  }

  ngOnInit(): void {
    this.allowComments = true;
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
  isPrivateChecked(event) {
    return this.isPrivate = event.target.checked;
  }

  allowCommentsChecked(event) {
    return this.allowComments = event.target.checked;
  }

  get title() {
    return this.createListForm.get('title');
  }

  async redirect(url) {
    await this.router.navigate([url]);
  }
}
