import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ListsService } from '../../_services/lists.service';
import { Router } from '@angular/router';
import { ListVisibility } from '../../helper/list-visibility';
import { ListModel } from '../../models/list.model';
import { IconsModule } from '../../_modules/icons/icons.module';

export interface Response {
  message: string;
  url: any;
}

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.sass'],
  imports: [ReactiveFormsModule, IconsModule],
  standalone: true,
})
export class CreateListComponent implements OnInit {
  public createListForm: UntypedFormGroup;
  public allowComments!: boolean;
  public visibilityOptions!: ListVisibility[];
  private redirectURL!: string;

  // errorMessage: string;
  constructor(
    private alertService: AlertService,
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService,
    private router: Router
  ) {
    this.createListForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      deadline: [''],
      visibility: [ListVisibility.public],
      allow_comments: [true],
    });
  }

  ngOnInit(): void {
    this.allowComments = true;
    this.visibilityOptions = [
      ListVisibility.private,
      ListVisibility.unlisted,
      ListVisibility.public,
    ];
  }

  onSubmit(data: ListModel): void {
    this.listService.createList(data).subscribe({
      next: async (response: unknown) => {
        const res = response as Response;
        this.alertService.success(res.message);
        this.redirectURL = res.url;
        await this.router.navigate([`/l/${res.url}`]);
      },
      error: error => {
        this.alertService.error(
          `Error: ${error.status} - ${error.error.message}`,
          null,
          5000,
          true
        );
      },
    });
  }

  allowCommentsChecked(event: Event | any): any {
    return (this.allowComments = event.target.checked);
  }

  get title(): AbstractControl {
    return <AbstractControl<any, string>>this.createListForm.get('title');
  }
  get visibility(): AbstractControl {
    return <AbstractControl<any, string>>this.createListForm.get('visibility');
  }
  async redirect(url: string): Promise<void> {
    await this.router.navigate([url]);
  }
}
