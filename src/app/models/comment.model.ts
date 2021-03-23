export interface CommentModel {
  comment: string;
  creation_date: Date;
  formatted_creation_date?: string;
  time_difference?: string;
  firstName: string;
  lastName: string;
  parent_id: number;
  username: string;
  listInfo: string;
}
