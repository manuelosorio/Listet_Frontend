import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeft, Check, CheckSquare, ChevronLeft, Github, Heart, Linkedin,
  Search, Square, Trash, Twitter, User, X } from 'angular-feather/icons';
import {FeatherModule} from 'angular-feather';


const icons: any = {
  ArrowLeft,
  Check,
  CheckSquare,
  ChevronLeft,
  Github,
  Heart,
  Linkedin,
  Search,
  Square,
  Trash,
  Twitter,
  User,
  X
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
