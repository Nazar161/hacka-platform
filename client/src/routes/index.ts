import React from "react";
import Home from "../pages/home-page/Home";
import Account from "../pages/account-page/Account";
import UserInfoUpd from "../pages/user-info-upd-page/UserInfoUpd";
import Registration from "../pages/registration-page/Registration";
import Teams from "../pages/team-page/Teams";
import TeamItemPage from "../pages/team-page/TeamItemPage";
import Vacancies from "../pages/vacancy-page/Vacancies";
import VacancyItemPage from "../pages/vacancy-page/VacancyItemPage";

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
    TEAM_ITEM_PAGE = 'teams/:teamId',
    VACANCIES = 'vacancies',
    VACANCY_ITEM_PAGE = 'vacancies/:vacancyId'
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
        element: TeamItemPage,
        path: authRoutesNames.TEAM_ITEM_PAGE
    },
    {
        element: Vacancies,
        path: authRoutesNames.VACANCIES
    },
    {
        element: VacancyItemPage,
        path: authRoutesNames.VACANCY_ITEM_PAGE
    }
]

export const captainRoutes: IRoute[] = [

]

export const adminRoutes: IRoute[] = [

]
