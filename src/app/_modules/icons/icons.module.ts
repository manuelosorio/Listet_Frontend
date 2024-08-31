import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
  Info,
  Linkedin,
  Menu,
  MoreVertical,
  Save,
  Search,
  Square,
  Trash,
  Twitter,
  User,
  X,
  XCircle,
} from 'angular-feather/icons';
import { UserCircle } from '../../shared/other-icons';
import { FeatherModule } from 'angular-feather';

const icons: { [key: string]: string } = {
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
  Info,
  Linkedin,
  Menu,
  MoreVertical,
  Save,
  Search,
  Square,
  Trash,
  Twitter,
  User,
  UserCircle,
  X,
  XCircle,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
