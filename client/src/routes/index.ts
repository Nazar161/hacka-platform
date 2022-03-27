import React from "react";
import Home from "../pages/Home";

export interface IRoute {
    element: React.ComponentType,
    path: string,
}

export enum publicRoutesNames {
    HOME = '',

}

export enum authRoutesNames {

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
]

export const authRoutes: IRoute[] = [

]

export const captainRoutes: IRoute[] = [

]

export const adminRoutes: IRoute[] = [

]
