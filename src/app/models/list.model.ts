export interface ListModel {
  id: number;
  slug: string;
  name: string;
  description: string;
  creation_date: Date | string;
  is_complete: number;
  deadline: string | null;
  visibility: number;
  allow_comments: number;
  firstName: string;
  lastName: string;
  owner_username: string;
  is_owner: boolean;
  isEditing?: boolean;
  featured?: boolean;
  cached?: boolean,
  data?: ListModel[]
}
