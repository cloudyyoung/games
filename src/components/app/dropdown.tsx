import { DropdownMenu, DropdownItem, DropdownLabel, DropdownDivider, Dropdown, DropdownButton } from "../dropdown"
import { NavbarItem, NavbarLabel } from "../navbar"

export const GamesDropdown = () => {
  return (
    <Dropdown>
      <DropdownButton as={NavbarItem} className="max-lg:hidden cursor-pointer">
        <NavbarLabel className="font-extrabold text-xl">Queens</NavbarLabel>
        <span className="material-symbols-sharp text-lg -ml-1 font-extrabold">expand_all</span>
      </DropdownButton>
      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
        <DropdownItem href="/">
          <DropdownLabel>Home</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/queens">
          <DropdownLabel>Queens</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}