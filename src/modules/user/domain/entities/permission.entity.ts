export enum PermissionType {
  Users = 'Users',
  Products = 'Products',
  Orders = 'Orders',
  Tickets = 'Tickets',
  Discounts = 'Discounts',
  Statistics = 'Statistics',
}

interface PermissionProps {
  id?: string;
  user_id: string;
  type: PermissionType;
  created_at?: Date;
  updated_at?: Date;
}

export class Permission {
  public readonly id?: string;
  public readonly user_id: string;
  public readonly type: PermissionType;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(props: PermissionProps) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.type = props.type;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }
}
