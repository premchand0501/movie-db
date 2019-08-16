import { HTMLAttributes, PropsWithChildren, ReactText } from "react";

export interface IHeaderTagProps {
  tag?: ReactText;
  props?: PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;
}
export interface IHexColorOnPosition {
  hexColor: string;
  width: number;
  height: number;
}