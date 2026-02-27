import {
  Component,
  input,
  InputSignal,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ListsService } from '@services/lists.service';
import { ListItemModel } from '@models/list-item.model';
import { ActionButtonComponent } from '@shared/action-button/action-button.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-list-item',
  templateUrl: './edit-list-item.component.html',
  styleUrls: ['./edit-list-item.component.sass'],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
  imports: [ReactiveFormsModule, ActionButtonComponent],
})
export class EditListItemComponent implements OnInit {
  listItem: InputSignal<ListItemModel> = input.required<ListItemModel>();
  public listItemForm!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService
  ) {
    this.listItemForm = this.formBuilder.group({
      item: ['', [Validators.required]],
      deadline: [''],
    });
  }
  cancel(): void {
    this.listItem().isEditing = false;
  }

  submit(data: ListItemModel): void {
    data.list_id = this.listItem().list_id;
    console.log(data);
    this.listService.updateItem(data, this.listItem().id).subscribe({
      next: _res => {
        this.listItem().isEditing = false;
      },
      error: error => {
        console.error(error);
      },
    });
  }
  ngOnInit(): void {
    const { deadline, item } = this.listItem();
    const formattedDeadline = deadline
      ? formatDate(deadline, 'YYYY-MM-dd', 'en', 'UTC')
      : null;
    this.listItemForm.setValue({
      item,
      deadline: formattedDeadline,
    });
  }
  get item(): AbstractControl {
    return <AbstractControl<any, string>>this.listItemForm.get('item');
  }
}
