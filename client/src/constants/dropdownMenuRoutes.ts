import { NavbarButtonLinkProps } from "../components/common/NavbarButtonLink"

export type dropdownMenuRoutesTitles = Omit<NavbarButtonLinkProps, 'style'> 

export const dropdownMenu: dropdownMenuRoutesTitles[] = [

    //to get teamId from redux store
    {
        path: `teams/:${'state.user.teamId'}`,
        title: 'Моя команда'
    }
]