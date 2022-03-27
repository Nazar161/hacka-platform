import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavBtn, NavBtns, NavLink, NavMenu } from './navbarStyle.js';
import LoginForm from '../../forms/login-form/LoginForm'
import { navPublicRoutes, navPrivateRoutes } from '../../../constants/navbarRoutes';

const Navbar: FC = () => {
    return (
        <Nav>
            <NavMenu>
                {navPublicRoutes.map(navRoute => 
                    <NavLink to={navRoute.path} key={navRoute.name}>
                        {navRoute.name}
                    </NavLink>)}
                
                {navPrivateRoutes.map(navPrivateRoute => 
                    <NavLink to={navPrivateRoute.path} key={navPrivateRoute.name}>
                        {navPrivateRoute.name}
                    </NavLink>)}
            </NavMenu>
            <NavBtns>
                <LoginForm/>
                <Link to='registration' style={{'marginRight': '5px'}}>
                    <NavBtn>Регистрация</NavBtn>
                </Link>
                <Link to='userprofile' style={{'marginRight': '5px'}}>
                     <NavBtn>имя пользователя</NavBtn>
                </Link>
                <NavBtn onClick={()=> console.log("hello bro")}>Выйти</NavBtn>
                <Link to='adminpage' style={{'marginRight': '5px'}}>
                    <NavBtn>admin</NavBtn>
                </Link>
            </NavBtns>
        </Nav>
    );
};
export default Navbar;