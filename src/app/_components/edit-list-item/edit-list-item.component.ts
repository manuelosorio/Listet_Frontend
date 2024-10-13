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
      ? new Date(deadline).toISOString().substring(0, 10)
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
