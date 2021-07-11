import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailsComponent } from './list-details.component';
import { ListHeaderComponent } from '../../_components/list-header/list-header.component';
import { ListCommentsComponent } from '../../_components/list-comments/list-comments.component';
import { ListItemsComponent } from '../../_components/list-items/list-items.component';
import { AddItemComponent } from '../../_components/add-item/add-item.component';
import { EditListItemComponent } from '../../_components/edit-list-item/edit-list-item.component';
import { EditListComponent } from '../../_components/edit-list/edit-list.component';
import { EditCommentComponent } from '../../_components/edit-comment/edit-comment.component';
import { IconsModule } from '../../_modules/icons/icons.module';
import { DeadlineModule } from '../../shared/deadline/deadline.module';
import { ActionButtonModule } from '../../shared/action-button/action-button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCommentComponent } from '../../_components/create-comment/create-comment.component';
import { CharacterCounterModule } from '../../shared/character-counter/character-counter.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ListDetailsComponent
  },
];

@NgModule({
  declarations: [
    AddItemComponent,
    CreateCommentComponent,
    EditListItemComponent,
    EditListComponent,
    EditCommentComponent,
    ListDetailsComponent,
    ListHeaderComponent,
    ListCommentsComponent,
    ListItemsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IconsModule,
    DeadlineModule,
    ActionButtonModule,
    HttpClientModule,
    CharacterCounterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class ListDetailsModule {
}
