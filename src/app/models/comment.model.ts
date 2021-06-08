export interface CommentModel {
  id: number;
  comment: string;
  creation_date: Date;
  date_updated?: Date;
  formatted_creation_date?: string;
  time_difference?: string;
  firstName: string;
  lastName: string;
  parent_id: number;
  username: string;
  list_id: number;
  listInfo: string;
  is_owner: boolean;
  isEditing?: boolean;
}
