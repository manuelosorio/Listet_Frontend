import { Component, Input, OnInit } from '@angular/core';
import { ListModel } from '../../models/list.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { AlertService } from '../../_services/alert.service';
import { Response } from '../../_pages/create-list/create-list.component';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListVisibility } from '../../helper/list-visibility';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.sass']
})
export class EditListComponent implements OnInit{
  @Input() list: ListModel;
  public editListForm: FormGroup;
  public visibility: number;
  public visibilityOptions: ListVisibility[];
  public allowComments: boolean;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
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
    this.visibilityOptions = [ListVisibility.private, ListVisibility.unlisted, ListVisibility.public]
  }

  ngOnInit(): void {
    this.editListForm.setValue({
      title: this.list.name,
      description: this.list.description,
      deadline: this.list.deadline != null ? formatDate(this.list.deadline,'YYYY-MM-dd', 'en') : '',
      visibility: this.visibilityOptions[this.list.visibility],
      allow_comments: !!this.list.allow_comments
    })
    this.visibility = this.list.visibility;
    this.allowComments = !!this.list.allow_comments;
  }
  cancel() {
    this.list.isEditing = false;
  }
  onSubmit(data) {
    data.prevSlug = this.route.snapshot.params.slug;
    this.listService.updateList(data, this.list.id).subscribe(async (_res: Response) => {
      // this.alertService.success(res.message);
      this.list.isEditing = false
    }, error => {
      this.alertService.error(`Error: ${error.status} - ${error.error.message}`);
    }, () => {
    });
  }
  visibilityChecked(event) {
    return this.visibility = event.target.checked;
  }

  allowCommentsChecked(event) {
    return this.allowComments = event.target.checked;
  }

  get title() {
    return this.editListForm.get('title');
  }
  get visibilityValidation() {
    return this.editListForm.get('visibility')
  }
}
