import React, {FC} from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import {publicRoutes} from './index'


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
            </Routes> 
    );
};

export default AppRouter;