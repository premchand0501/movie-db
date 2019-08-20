import { RouteComponentProps } from "react-router";

export interface IHeaderProps extends RouteComponentProps<any> {
  favs: number;
}