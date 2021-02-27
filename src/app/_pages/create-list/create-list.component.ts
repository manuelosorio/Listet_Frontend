import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../_services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListsService} from '../../_services/lists.service';
import {Router} from '@angular/router';

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
  errorMessage: string;
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
    this.listService.createList(data).subscribe((res: Response) => {
      // const user = res.username;
      // const slug = res.slug;
      // this.router.navigate([`/list/${res.username}/${res.slug}`]);
      console.log(res.url);
      this.alertService.success(res.message);
      this.redirectURL = res.url;
      setTimeout(() => {
        this.redirect('/l/' + res.url);
      }, 500);
    }, error => {
      console.error(error);
      this.alertService.error(`${error.statusText}, Error Code: ${error.status}`);
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
  redirect(url) {
    this.router.navigate([url]);
  }
}
