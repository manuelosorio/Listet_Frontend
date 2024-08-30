import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { Router } from '@angular/router';
import { ListVisibility } from '../../helper/list-visibility';
import { ListModel } from '../../models/list.model';
import { FeatherModule } from 'angular-feather';
import { NgIf } from '@angular/common';

export interface Response {
  message: string;
  url: any;
}

@Component({
    selector: 'app-create-list',
    templateUrl: './create-list.component.html',
    styleUrls: ['./create-list.component.sass'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, FeatherModule]
})
export class CreateListComponent implements OnInit {
  public createListForm: UntypedFormGroup;
  public allowComments: boolean;
  public visibilityOptions: ListVisibility[];
  private redirectURL;

  // errorMessage: string;
  constructor(
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
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
    this.visibilityOptions = [ListVisibility.private, ListVisibility.unlisted, ListVisibility.public];
  }

  onSubmit(data: ListModel): void {
    this.listService.createList(data).subscribe(async (res: Response) => {
      this.alertService.success(res.message);
      this.redirectURL = res.url;
      await this.router.navigate([`/l/${res.url}`]);
    }, error => {
      this.alertService.error(`Error: ${error.status} - ${error.error.message}`, null, 5000, true);
    });
  }

  allowCommentsChecked(event: Event | any): any {
    return this.allowComments = event.target.checked;
  }

  get title(): AbstractControl {
    return this.createListForm.get('title');
  }
  get visibility(): AbstractControl {
    return this.createListForm.get('visibility');
  }
  async redirect(url: string): Promise<void> {
    await this.router.navigate([url]);
  }

}
