import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MySVG from "../Components/Logo";
import Login from "../Components/Login";
import { Oval } from "react-loader-spinner";

const LoginPage = () => {
  return (
    <Login>
      {({ email, setEmail, password, setPassword, loading, handleLogin }) => (
        <Container>
          <MySVG />

          <Form onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <Button type="submit" disabled={loading}>
              {loading ? (
                <Oval
                  height={24}
                  width={24}
                  color="#ffffff"
                  secondaryColor="#A8DFF1"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              ) : (
                "Entrar"
              )}
            </Button>
          </Form>

          <StyledLink to="/join">Não tem uma conta? Cadastre-se!</StyledLink>
        </Container>
      )}
    </Login>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 68px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 303px;
  height: 45px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid rgba(219, 219, 219, 1);
  color: rgba(219, 219, 219, 1);
  font-size: 19px;
  padding-left: 10px;
  font-family: "Lexend Deca", sans-serif;
  background-color: ${(props) => (props.disabled ? "#f2f2f2" : "#ffffff")};
`;

const Button = styled.button`
  width: 305px;
  height: 45px;
  margin-top: 20px;
  border-radius: 4.64px;
  background-color: ${(props) => (props.disabled ? "#A8DFF1" : "rgba(82, 182, 255, 1)")};
  color: #ffffff;
  font-size: 21px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  font-size: 14px;
  color: rgba(82, 182, 255, 1);
  font-family: "Lexend Deca", sans-serif;
  &:hover {
    text-decoration: underline;
  }
`;
