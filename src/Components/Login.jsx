import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const Login = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", { email, password })
      .then((response) => {
        const { token, ...userData } = response.data;
        loginUser({ ...userData, token });
        navigate("/");
      })
      .catch(() => {
        alert("Erro ao fazer login. Verifique suas credenciais.");
        setLoading(false);
      });
  };

  return children({
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleLogin,
  });
};

export default Login;
