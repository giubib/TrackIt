import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();

    return (
        <FooterContainer>
            <StyledLink to="/hoje">
                <Button $isActive={location.pathname === "/hoje"}>
                    <EventAvailableIcon />
                    Hoje
                </Button>
            </StyledLink>

            <StyledLink to="/habitos">
                <Button $isActive={location.pathname === "/habitos"}>
                    <CalendarMonthIcon />
                    Hábitos
                </Button>
            </StyledLink>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    display: flex;
    width: 100%;
    height: 70px;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    flex: 1;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background-color: ${({ $isActive }) => ($isActive ? "#52B6FF" : "white")};
    color: ${({ $isActive }) => ($isActive ? "white" : "#52B6FF")};
    border: none;
    width: 100%;
    height: 100%;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: ${({ $isActive }) => ($isActive ? "#429ad8" : "#f0f8ff")};
    }
`;
