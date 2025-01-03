import Play from "./pages/play";
import Tutorial from "./pages/tutorial";
import { RouteObjectExtended } from "../types/route";

export const routes: RouteObjectExtended[] = [
  {
    id: "play",
    title: "Play",
    index: true,
    Component: Play,
  },
  {
    id: "tutorial",
    title: "Tutorial",
    path: "tutorial",
    Component: Tutorial,
  },
];
