import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListsService } from '@services/lists.service';
import { ListDataService } from '@shared/list-data.service';
import { WebsocketService } from '@services/websocket.service';
import { ListItemEvents } from '@helpers/list-item.events';
import { ListItemModel } from '@models/list-item.model';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.sass'],
    imports: [ReactiveFormsModule]
})
export class AddItemComponent implements OnInit {
  private formBuilder = inject(UntypedFormBuilder);
  private listService = inject(ListsService);
  private listDataService = inject(ListDataService);
  private route = inject(ActivatedRoute);
  private webSocketService = inject(WebsocketService);

  listItemForm: UntypedFormGroup;
  isOwner: boolean = false;
  private listData: Subscription = new Subscription();
  private readonly listOwner: string;
  private id!: number;
  private readonly slug: string;
  private readonly username: string;

  constructor() {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listOwner = this.route.snapshot.params.username;
    this.listItemForm = this.formBuilder.group({
      item: ['', [Validators.required]],
      deadline: [''],
    });
  }

  ngOnInit(): void {
    this.listData = this.listDataService.listData$.subscribe((data: any) => {
      this.id = data.id;
      this.isOwner = data.isOwner;
    });
  }

  onSubmit(data: ListItemModel): void {
    data.list_id = this.id;
    data.slug = this.slug;
    this.listService.createListItem(data).subscribe({
      next: res => {
        this.listItemForm.reset();
        this.webSocketService.emit(ListItemEvents.ADD_ITEM, res);
      },
      error: error => {
        console.error(error);
      },
    });
  }

  get item(): AbstractControl {
    return <AbstractControl<any, string>>this.listItemForm.get('item');
  }
}
