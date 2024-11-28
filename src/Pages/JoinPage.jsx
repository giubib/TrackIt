import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MySVG from "../Components/Logo";
import Join from "../Components/Join";
import { Oval } from "react-loader-spinner";

const JoinPage = () => {
  return (
    <Join>
      {({ name, setName, email, setEmail, password, setPassword, image, setImage, loading, handleSignUp }) => (
        <Container>
          <MySVG />

          <Form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder="nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
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
            <Input
              type="url"
              placeholder="foto"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
                "Cadastrar"
              )}
            </Button>
          </Form>

          <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
      )}
    </Join>
  );
};

export default JoinPage;

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

  &::placeholder {
    color: rgba(219, 219, 219, 1);
  }

  &:disabled {
    cursor: not-allowed;
  }
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
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#A8DFF1" : "rgba(72, 162, 245, 1)")};
  }
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
