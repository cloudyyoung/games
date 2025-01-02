import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer, NavbarDivider } from "../../components/navbar"

export const AppNavbar = () => {
  return (
    <Navbar>
      <NavbarLabel className="uppercase font-extrabold text-xl">Queens</NavbarLabel>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        <NavbarItem href='/'>Play</NavbarItem>
        <NavbarItem href='/tutorial'>Tutorial</NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
    </Navbar>
  )
}
