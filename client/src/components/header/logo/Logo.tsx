import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './logo.module.css'

const Logo: FC = () => {
    return (
        <Link to=''>
            <h1 className={style.logo}>HackaPlatform</h1>
        </Link>
    );
};

export default Logo;