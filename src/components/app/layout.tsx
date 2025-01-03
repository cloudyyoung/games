import { RouteObjectExtended } from "../../types/route"
import { StackedLayout } from "../stacked-layout"
import { AppNavbar } from "./navbar"
import { AppSidebar } from "./sidebar"

export interface AppLayoutProps {
  routes: RouteObjectExtended[]
}

const AppLayout = ({ routes }: AppLayoutProps) => {
  return (
    <StackedLayout
      navbar={<AppNavbar routes={routes} />}
      sidebar={<AppSidebar routes={routes} />}
    />
  )
}

export default AppLayout