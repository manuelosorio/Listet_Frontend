import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { ListModel } from '@models/list.model';
import { ListsService } from '@services/lists.service';
import { AlertService } from '@services/alert.service';
import { Response } from '@pages/create-list/create-list.component';
import { ListVisibility } from '@helpers/list-visibility';
import { ActionButtonComponent } from '@shared/action-button/action-button.component';

interface OnSubmitParams<Data extends ListModel> {
  data?: Data;
  prevSlug: string;
}

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule, FeatherModule, ActionButtonComponent],
})
export class EditListComponent implements OnInit {
  @Input() list!: ListModel;
  public editListForm: UntypedFormGroup;
  public visibility?: number;
  public visibilityOptions: ListVisibility[];
  public allowComments?: boolean;

  constructor(
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService,
    private route: ActivatedRoute
  ) {
    this.editListForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      deadline: [''],
      visibility: [ListVisibility.public, Validators.required],
      allow_comments: [true],
    });
    this.visibilityOptions = [
      ListVisibility.private,
      ListVisibility.unlisted,
      ListVisibility.public,
    ];
  }

  ngOnInit(): void {
    this.editListForm.setValue({
      title: this.list.name,
      description: this.list.description,
      deadline: this.list.deadline
        ? formatDate(this.list.deadline, 'YYYY-MM-dd', 'en')
        : '',
      visibility: this.visibilityOptions[this.list.visibility],
      allow_comments: !!this.list.allow_comments,
    });
    this.visibility = this.list.visibility;
    this.allowComments = !!this.list.allow_comments;
  }
  cancel(): void {
    this.list.isEditing = false;
  }
  onSubmit(data: OnSubmitParams<any>): void {
    data.prevSlug = this.route.snapshot.params.slug;
    this.listService.updateList(data, this.list.id).subscribe({
      next: async (res: object) => {
        const response = res as Response;
        this.alertService.success(response.message);
        this.list.isEditing = false;
      },
      error: error => {
        this.alertService.error(
          `Error: ${error.status} - ${error.error.message}`
        );
      },
    });
  }
  visibilityChecked(event: any): HTMLInputElement {
    return (this.visibility = event.target.checked);
  }

  allowCommentsChecked(event: any): HTMLInputElement {
    return (this.allowComments = event.target.checked);
  }

  get title(): AbstractControl {
    return <AbstractControl<any, string>>this.editListForm.get('title');
  }
  get visibilityValidation(): AbstractControl {
    return <AbstractControl<any, string>>this.editListForm.get('visibility');
  }
}
