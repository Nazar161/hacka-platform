import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';


export const Nav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavMenu = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 768px) {
        display: none;
    }
`

export const NavLink = styled(Link)`
    color: cornsilk;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 16px;

    margin-right: 10px;

    :last-child {
        margin-right: 0;
    }

    &.active {
        color: #15cdfc;
    }
`

export const NavBtns = styled.div`
    display: flex;
    align-items: center;
    margin-left: 30px;
    justify-content: flex-end;
    font-size: 16px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`
export const NavBtn = styled.button`
    cursor: pointer;
    border: none;
    background-color: #15a9cf;
    color: cornsilk;
    border-radius: 7px;
    padding: 3px 14px;
    margin-right: 5px;
    :last-child {
        margin-right: 0;
    }

    :hover {
        background-color: #255783;
        transition: 300ms;
        color: #15cdfc;
    }
`