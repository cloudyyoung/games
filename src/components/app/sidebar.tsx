import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarSection } from "../../components/sidebar"
import { RouteObjectExtended } from "../../types/route"

export interface AppSidebarProps {
  routes: RouteObjectExtended[]
}

export const AppSidebar = ({ routes }: AppSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="font-extrabold text-xl px-2 pt-4">Queens</div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          {
            routes.map((route) => (
              <SidebarItem key={route.id} href={route.path}>{route.title}</SidebarItem>
            ))
          }
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}