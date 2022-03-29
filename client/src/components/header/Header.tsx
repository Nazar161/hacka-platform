import React, { FC } from 'react';
import { Container } from '../../styled-сomponents';
import Logo from './logo/Logo';
import Navbar from './navbar/Navbar';
import style from './header.module.css'

const Header: FC = () => {
    return (
        <header className={style.header}>
            <Container>
                <div className={style.items}>
                    <Logo/>
                    <Navbar/>
                </div>
            </Container>
        </header>
    );
};

export default Header;