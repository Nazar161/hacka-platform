import React, { FC } from 'react';
import { dropdownMenu } from '../../constants/dropdownMenuRoutes';
import NavbarButtonLink from '../common/NavbarButtonLink';
import style from './dropdownMenu.module.css'

const DropdownMenu: FC = () => {
    return (
        <div className={style.menu}>
            {dropdownMenu.map(item =>
                <NavbarButtonLink
                    path={item.path}
                    title={item.title}
                    key={item.title}
                />
            )}
        </div>
    );
};

export default DropdownMenu;