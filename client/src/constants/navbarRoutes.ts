export interface navRoutes {
    name: string,
    path: string
}
export const navPublicRoutes: navRoutes[] = [
    {
        name: 'Хакатоны',
        path: 'events'
    }
]


export const navPrivateRoutes: navRoutes[] = [
    {
        name: 'Вакансии',
        path: 'vacancies'
    }
]