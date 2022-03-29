import React, { FC } from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import DropdownMenu from './DropdownMenu';
import { NavBtn } from '../header/navbar/navbarStyle';

const Dropdown: FC = () => {
    return (
        <AntdDropdown overlay={<DropdownMenu/>}>
            <NavBtn>Имя пользователя</NavBtn>
        </AntdDropdown>
    );
};

export default Dropdown;