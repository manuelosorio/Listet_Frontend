import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertCircle, ArrowLeft, Check, CheckSquare, ChevronLeft, Clock, Edit, Frown,
  Github, Heart, Linkedin, Menu, MoreVertical, Search, Square, Trash, Twitter, User, X, XCircle } from 'angular-feather/icons';
import { UserCircle } from '../../shared/other-icons';
import { FeatherModule } from 'angular-feather';

const icons: any = {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckSquare,
  ChevronLeft,
  Clock,
  Edit,
  Frown,
  Github,
  Heart,
  Linkedin,
  Menu,
  MoreVertical,
  Search,
  Square,
  Trash,
  Twitter,
  User,
  UserCircle,
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
