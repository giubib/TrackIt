import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Join ({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      email,
      name,
      image,
      password,
    };

    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        alert(error.response?.data?.message || "Erro ao fazer cadastro. Tente novamente.");
        setLoading(false);
      });
  };

  return children({
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    image,
    setImage,
    loading,
    handleSignUp,
  });
};


