import { Navbar, NavbarItem, NavbarSection, NavbarSpacer, NavbarDivider } from "../../components/navbar"
import { RouteObjectExtended } from "../../types/route"
import { GamesDropdown } from "./dropdown"

export interface AppNavbarProps {
  routes: RouteObjectExtended[]
}

export const AppNavbar = ({ routes }: AppNavbarProps) => {
  return (
    <Navbar>
      <GamesDropdown />
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        {
          routes.map((route) => (
            <NavbarItem key={route.id} href={route.path}>{route.title}</NavbarItem>
          ))
        }
      </NavbarSection>
      <NavbarSpacer />
    </Navbar>
  )
}
