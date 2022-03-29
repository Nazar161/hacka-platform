import React, { FC } from 'react';
import { Nav, NavBtn, NavBtns, NavLink, NavMenu } from './navbarStyle.js';
import LoginForm from '../../forms/login-form/LoginForm'
import { navPublicRoutes, navPrivateRoutes } from '../../../constants/navbarRoutes';
import Dropdown from '../../dropdown/Dropdown';
import NavbarButtonLink from '../../common/NavbarButtonLink';

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
                <NavbarButtonLink path='registration' title='Регистрация' style={{'marginRight': '5px'}}/>
                <Dropdown/>
                <NavBtn onClick={()=> console.log("hello bro")}>Выйти</NavBtn>
                <NavbarButtonLink path='adminpage' title='admin' style={{'marginRight': '5px'}}/>
            </NavBtns>
        </Nav>
    );
};
export default Navbar;