import { RouteObject } from "react-router";

export type RouteObjectExtended = RouteObject & {
  title: string;
};
