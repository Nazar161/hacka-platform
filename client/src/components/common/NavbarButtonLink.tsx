import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavBtn } from '../header/navbar/navbarStyle';

export interface NavbarButtonLinkProps {
    path: string,
    title: string,
    style?: React.CSSProperties 
}

const NavbarButtonLink: FC<NavbarButtonLinkProps> = ({path, title, style}) => {
    return (
        <Link to={path} style={style}>
            <NavBtn>{title}</NavBtn>
        </Link>
    );
};

export default NavbarButtonLink;