import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { DateUtil } from '../../utils/dateUtil';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.sass'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EditListItemComponent implements OnInit {
  @Input() listItem;
  public listItemForm: FormGroup;
  public isEdit: boolean
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService
  ) {

  }
  cancel() {
    this.listItem.isEditing = false;
  };

  submit(data) {
    console.log(data);
    data.list_id = this.listItem.list_id;
    this.listService.updateItem(data, this.listItem.id).subscribe(res => {
      console.log(res);
    }, error => {
      console.error(error);
    })
    this.listItem.isEditing = false;
  };
  ngOnInit(): void {
    this.listItemForm = this.formBuilder.group({
      item: ['', [
        Validators.required
      ]],
      deadline: ['']
    });
    this.listItemForm.setValue({
      item: this.listItem.item,
      deadline: this.listItem.deadline != null ? formatDate(this.listItem.deadline,'YYYY-MM-dd', 'en') : ''
    });
  }

}
