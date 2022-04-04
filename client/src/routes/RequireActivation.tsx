import React, { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//imitation of redux :)
const store = {
    user: {
        isActivated: true
    }
}
const RequireActivation: FC = () => {
    const location = useLocation();

    return (
        store.user.isActivated
            ? <Outlet/>
            : <Navigate to="activation" state={{ from: location }} replace/>
    );
};

export default RequireActivation;