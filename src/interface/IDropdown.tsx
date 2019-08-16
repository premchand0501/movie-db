export interface IDropdownProps {
  currentState: boolean;
  children: React.ReactNode;
  menuAlignment: string;
  menuItems: string[];
}
export interface IDropdownStates {
  currentState: boolean;
  title: string;
}
export interface DropdownPropsItem {
  children: React.ReactNode;
  show: boolean;
}