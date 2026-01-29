import { Navbar, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer, NavbarDivider } from "../../components/navbar"

export const AppNavbar = ({ setPage }: { setPage: React.Dispatch<React.SetStateAction<"play" | "tutorial">> }) => {
  return (
    <Navbar>
      <NavbarLabel className="font-extrabold text-xl">Queens</NavbarLabel>
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        <NavbarItem onClick={() => setPage("play")}>Play</NavbarItem>
        <NavbarItem onClick={() => setPage("tutorial")}>Tutorial</NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
    </Navbar>
  )
}
