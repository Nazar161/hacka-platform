import { NavbarButtonLinkProps } from "../components/common/NavbarButtonLink"

export type dropdownMenuRoutesTitles = Omit<NavbarButtonLinkProps, 'style'> 

export const dropdownMenu: dropdownMenuRoutesTitles[] = [
    {
        path: 'myTeam',
        title: 'Моя команда'
    }
]