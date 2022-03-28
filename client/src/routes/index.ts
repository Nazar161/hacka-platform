import React from "react";
import Home from "../pages/Home";
import Account from "../pages/Account";
import UserInfoUpd from "../pages/UserInfoUpd";
import Registration from "../pages/Registration";
import Teams from "../pages/Teams";
import Team from "../pages/Team";

export interface IRoute {
    element: React.ComponentType,
    path: string,
}

export enum publicRoutesNames {
    HOME = '',
    REGISTRATION = 'registration',
}

export enum authRoutesNames {
    ACCOUNT = 'account',
    USER_INFO_UPDATE = 'userInfoUpd',
    TEAMS = 'teams',
    TEAM = 'teams/:teamId'
}

export enum captainRoutesNames {

}

export enum adminRoutesNames {

}

export const publicRoutes: IRoute[] = [
    {
        element: Home,
        path: publicRoutesNames.HOME

    },
    {
        element: Registration,
        path: publicRoutesNames.REGISTRATION
    }
]

export const authRoutes: IRoute[] = [
    {
        element: Account,
        path: authRoutesNames.ACCOUNT
    },
    {
        element: UserInfoUpd,
        path: authRoutesNames.USER_INFO_UPDATE
    },
    {
        element: Teams,
        path: authRoutesNames.TEAMS
    },
    {
        element: Team,
        path: authRoutesNames.TEAM
    }
]

export const captainRoutes: IRoute[] = [

]

export const adminRoutes: IRoute[] = [

]
