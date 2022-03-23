import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { formatDate } from '@angular/common';
import { ListItemModel } from '../../models/list-item.model';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditListItemComponent implements OnInit {
  @Input() listItem;
  public listItemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private _listDataService: ListDataService
  ) {

  }
  cancel(): void {
    this.listItem.isEditing = false;
  }

  submit(data: ListItemModel): void {
    data.list_id = this.listItem.list_id;
    this.listService.updateItem(data, this.listItem.id).subscribe(_res => {
      this.listItem.isEditing = false;
    }, error => {
      console.error(error);
    });
  }
  ngOnInit(): void {
    this.listItemForm = this.formBuilder.group({
      item: ['', [
        Validators.required
      ]],
      deadline: ['']
    });
    this.listItemForm.setValue({
      item: this.listItem.item,
      deadline: this.listItem.deadline != null ? formatDate(this.listItem.deadline, 'YYYY-MM-dd', 'en') : ''
    });
  }
  get item(): AbstractControl {
    return this.listItemForm.get('item');
  }

}
