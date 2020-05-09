import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Check, CheckSquare, Github, Search, Square, Trash, Twitter, User} from 'angular-feather/icons';
import {FeatherModule} from 'angular-feather';


const icons: any = {Check,
  CheckSquare,
  Github,
  Search,
  Square,
  Trash,
  Twitter,
  User
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
