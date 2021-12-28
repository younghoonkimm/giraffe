import { UserRole } from "../../../__generated__/globalTypes";

export interface CreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}
