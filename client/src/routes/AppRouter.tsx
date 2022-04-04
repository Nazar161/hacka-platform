import React, {FC} from 'react';
import { Route, Routes } from 'react-router-dom';
import Activation from '../pages/activation-page/Activation';
import NotFound from '../pages/not-found-page/NotFound';
import {adminRoutes, authRoutes, captainRoutes, publicRoutes} from './index'
import RequireActivation from './RequireActivation';

//imitation of redux :)
const store = {
    user: {
        roleId: 3
    },
    isAuth: true
}
const AppRouter: FC = () => {
    return (
            <Routes>
                {publicRoutes.map(route => 
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route element={<RequireActivation/>}>
                    {store.isAuth && authRoutes.map(route => 
                        <Route
                            path={route.path}
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    {store.isAuth && store.user.roleId === 3 && captainRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    {store.isAuth && store.user.roleId === 2 && adminRoutes.map(route =>
                        <Route
                            path={route.path}
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                </Route>

                <Route path='activation' element={<Activation/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes> 
    );
};

export default AppRouter;