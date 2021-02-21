import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeft, Check, CheckSquare, ChevronLeft, Clock, Frown, Github, Heart, Linkedin, Menu,
  Search, Square, Trash, Twitter, User, X, XCircle } from 'angular-feather/icons';
import {FeatherModule} from 'angular-feather';


const icons: any = {
  ArrowLeft,
  Check,
  CheckSquare,
  ChevronLeft,
  Clock,
  Frown,
  Github,
  Heart,
  Linkedin,
  Menu,
  Search,
  Square,
  Trash,
  Twitter,
  User,
  X,
  XCircle
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
