import { Sidebar, SidebarBody, SidebarHeader, SidebarItem, SidebarSection } from "../../components/sidebar"

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="font-extrabold text-xl px-2 pt-4">Queens</div>
      </SidebarHeader>
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href='/'>Play</SidebarItem>
          <SidebarItem href='/tutorial'>Tutorial</SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  )
}