import { Component, Input, OnInit } from '@angular/core';
import { ListModel } from '../../models/list.model';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { AlertService } from '../../_services/alert.service';
import { Response } from '../../_pages/create-list/create-list.component';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListVisibility } from '../../helper/list-visibility';

interface OnSubmitParams<Data extends ListModel | {prevSlug: string}> {
  data?: Data;
}

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.sass']
})
export class EditListComponent implements OnInit{
  @Input() list: ListModel;
  public editListForm: UntypedFormGroup;
  public visibility: number;
  public visibilityOptions: ListVisibility[];
  public allowComments: boolean;

  constructor(
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService,
    private route: ActivatedRoute
  ) {
    this.editListForm = formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      description: [''],
      deadline: [''],
      visibility: [ListVisibility.public, Validators.required],
      allow_comments: [true],
    });
    this.visibilityOptions = [ListVisibility.private, ListVisibility.unlisted, ListVisibility.public];
  }

  ngOnInit(): void {
    this.editListForm.setValue({
      title: this.list.name,
      description: this.list.description,
      deadline: this.list.deadline ? formatDate(this.list.deadline, 'YYYY-MM-dd', 'en') : '',
      visibility: this.visibilityOptions[this.list.visibility],
      allow_comments: !!this.list.allow_comments
    });
    this.visibility = this.list.visibility;
    this.allowComments = !!this.list.allow_comments;
  }
  cancel(): void {
    this.list.isEditing = false;
  }
  onSubmit(data: OnSubmitParams<any>): void {
    data.data.prevSlug = this.route.snapshot.params.slug;
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
    this.listService.updateList(data, this.list.id).subscribe(async (_res: Response) => {
      // this.alertService.success(res.message);
      this.list.isEditing = false;
    }, error => {
      this.alertService.error(`Error: ${error.status} - ${error.error.message}`);
    });
  }
  visibilityChecked(event: any): HTMLInputElement {
    return this.visibility = event.target.checked;
  }

  allowCommentsChecked(event: any): HTMLInputElement {
    return this.allowComments = event.target.checked;
  }

  get title(): AbstractControl {
    return this.editListForm.get('title');
  }
  get visibilityValidation(): AbstractControl {
    return this.editListForm.get('visibility');
  }
}
