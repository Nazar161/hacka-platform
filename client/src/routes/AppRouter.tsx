import React, {FC} from 'react';
import { Route, Routes } from 'react-router-dom';
import {authRoutes, publicRoutes} from './index'


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
                {authRoutes.map(route => 
                    <Route
                        path={route.path}
                        element={<route.element/>}
                        key={route.path}
                    />
                )}
                <Route 
                    path='*' 
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes> 
    );
};

export default AppRouter;