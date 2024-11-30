import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function Top () {
    const { user } = useContext(UserContext); 
    
  return (
    
      <Header>
        <SiteName>TrackIt</SiteName>
        <UserIcon src={user.image} alt="User Icon" />
      </Header>
     );
};




const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 70px;
  background: rgba(18, 107, 165, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
  box-sizing: border-box; 
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
  
`;
