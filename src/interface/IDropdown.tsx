export interface IDropdownProps {
  currentState: boolean;
  children: React.ReactNode;
  menuAlignment: string;
  menuItems: IDropdownMenuItem[];
  onItemSelect(item: IDropdownMenuItem): void;
}
export interface IDropdownStates {
  currentState: boolean;
  title: string;
}
export interface IDropdownMenuItem {
  id: string;
  value: string;
}