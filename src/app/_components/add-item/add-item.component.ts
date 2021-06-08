import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { WebsocketService } from '../../_services/websocket.service';
import { ListItemEvents } from '../../helper/list-item.events';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit, OnDestroy {
  listItemForm: FormGroup;
  isOwner: boolean;
  private listData: Subscription;
  private readonly listOwner: string;
  private id: number;
  private readonly slug: string;
  private readonly username: string;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    private webSocketService: WebsocketService,
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listOwner = this.route.snapshot.params.username;
    this.listItemForm = this.formBuilder.group({
      item: ['', [
        Validators.required
      ]],
      deadline: [''],
    });
  }


  ngOnInit(): void {
    this.listData = this.listDataService.listData$.subscribe((data: any) => {
      this.id = data.id;
      this.isOwner = data.isOwner;
    });
  }

  onSubmit(data) {
    data.list_id = this.id;
    data.slug = this.slug;
    this.listService.createListItem(data).subscribe((res) => {
      this.listItemForm.reset();
      this.webSocketService.emit(ListItemEvents.ADD_ITEM, res);
    }, error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
  }

  get item() {
    return this.listItemForm.get('item');
  }
}
