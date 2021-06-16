export interface IAccount {
  id: string;
  name: string;
  local_id: string;
  roles: Array<string>;
  active: number;
  created_at: Date;
}
