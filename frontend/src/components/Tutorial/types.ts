export interface Step {
  selector: string;
  title: string;
  message: React.ReactNode;
  navigateTo?: string;
  action?: () => void;
  autoNext?: boolean;
}
