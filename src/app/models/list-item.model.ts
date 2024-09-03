export interface ListItemModel {
  id: number;
  item: string;
  deadline: Date;
  completed: number | boolean;
  list_id: number;
  username: string;
  slug: string;
  isEditing?: boolean;
}
