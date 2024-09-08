import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListsService } from '@services/lists.service';
import { ListItemModel } from '@models/list-item.model';
import { ActionButtonComponent } from '@app/shared/action-button/action-button.component';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.sass'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [ReactiveFormsModule, ActionButtonComponent],
})
export class EditListItemComponent implements OnInit {
  @Input() listItem!: ListItemModel;
  public listItemForm!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService
  ) {}
  cancel(): void {
    this.listItem.isEditing = false;
  }

  submit(data: ListItemModel): void {
    data.list_id = this.listItem.list_id;
    this.listService.updateItem(data, this.listItem.id).subscribe({
      next: _res => {
        this.listItem.isEditing = false;
      },
      error: error => {
        console.error(error);
      },
    });
  }
  ngOnInit(): void {
    this.listItemForm = this.formBuilder.group({
      item: ['', [Validators.required]],
      deadline: [''],
    });
    this.listItemForm.setValue({
      item: this.listItem.item,
      deadline: this.listItem.deadline ?? null,
    });
  }
  get item(): AbstractControl {
    return <AbstractControl<any, string>>this.listItemForm.get('item');
  }
}
