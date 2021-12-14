export interface ButtonProps {
  buttonType: "button" | "submit" | "reset" | undefined;
  canClick: boolean;
  loading: boolean;
  actionText: string;
}
