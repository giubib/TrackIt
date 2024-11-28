import React from "react";
import styled from "styled-components";

const HabitsPage = () => {
  return (
    <Container>
      <Header>
        <SiteName>TrackIt</SiteName>
        <UserIcon src="/path/to/user-icon.png" alt="User Icon" />
      </Header>
    </Container>
  );
};

export default HabitsPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  padding-top: 80px;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: rgba(18, 107, 165, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
`;

const SiteName = styled.h1`
  font-family: "Playball", cursive;
  font-size: 38.98px;
  font-weight: 400;
  line-height: 48.73px;
  color: white;
  text-align: left;
`;

const UserIcon = styled.img`
  width: 51px;
  height: 51px;
  border-radius: 50%;
  opacity: 0.9;
  object-fit: cover;
`;
