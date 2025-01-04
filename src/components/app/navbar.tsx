import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer, NavbarDivider } from "../../components/navbar"
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "../dropdown"

export const AppNavbar = () => {
  return (
    <Navbar>
      <Dropdown>
        <DropdownButton as={NavbarItem} className="max-lg:hidden">
          <NavbarLabel className="font-extrabold text-xl">Queens</NavbarLabel>
          <span className="material-symbols-sharp text-lg -ml-1 font-extrabold">expand_all</span>
        </DropdownButton>
        <GamesDropdownMenu />
      </Dropdown>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        <NavbarItem href=''>Play</NavbarItem>
        <NavbarItem href='tutorial'>Tutorial</NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
    </Navbar>
  )
}

export const GamesDropdownMenu = () => {
  return (
    <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
      <DropdownItem href="/">
        <DropdownLabel>Home</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="/queens">
        <DropdownLabel>Queens</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}