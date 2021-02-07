import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ListsService } from "../../_services/lists.service";
import { ListDataService } from "../../shared/list-data.service";
// import { WebsocketService } from "../../_services/websocket.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.sass']
})
export class AddItemComponent implements OnInit, OnDestroy {
  listItemForm: FormGroup;
  private listData: Subscription;
  private readonly listOwner: string;
  private id: number;
  isOwner: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    // private webSocketService: WebsocketService,
  ) {
    this.listOwner = this.route.snapshot.params.username;
    this.listItemForm = this.formBuilder.group({
      item: ['', [
        Validators.required
      ]],
      deadline: [''],
    });
  }


  ngOnInit(): void {
    this.listData = this.listDataService.listData.subscribe((data: any) => {
      this.id = data.id;
      console.log(data)
    });
  }

  onSubmit(data) {

    data.list_id = this.id;
    this.listService.createListItem(data).subscribe(() => {
      this.listItemForm.reset();
    }, error => {
      console.error(error)
    });
  }
  ngOnDestroy(): void {
  }

  get item() {
    return this.listItemForm.get('item');
  }


}