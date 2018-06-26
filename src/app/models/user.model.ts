import { group } from './../components/models/group.model';
export interface user {

  // id : number;
  username: string;
  displayName: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  enabled: boolean;
  groups:group[];
  lastPasswordResetDate: Date;
}
