export interface ListModel {
  id: number;
  slug: string;
  name: string;
  description: string;
  creation_date: Date;
  is_complete: number;
  deadline: string | null;
  is_private: number;
  allow_comments: number;
  firstName: string;
  lastName: string;
  owner_username: string;
  isEditing?: boolean
}
