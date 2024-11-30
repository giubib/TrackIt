import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import Top from "../Components/Top";
import Footer from "../Components/Footer";
import { UserContext } from "../Contexts/UserContext";

export default function TodayPage() {
  const { user } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      fetchTodayHabits(user.token);
    }
  }, [user?.token]);

  const fetchTodayHabits = async (token) => {
    try {
      const response = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHabits(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar hábitos do dia:", err);
      alert("Erro ao carregar hábitos do dia.");
      setLoading(false);
    }
  };

  const toggleHabitStatus = async (habitId, done) => {
    const url = done
      ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`
      : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`;

    try {
      await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchTodayHabits(user.token); 
    } catch (err) {
      console.error("Erro ao atualizar o status do hábito:", err);
      alert("Erro ao atualizar o status do hábito.");
    }
  };

  return (
    <>
      <Top />
      <PageContainer>
        <Header>
          <h1>{getFormattedDate()}</h1>
        </Header>
        {loading ? (
          <Message>Carregando hábitos...</Message>
        ) : habits.length > 0 ? (
          habits.map((habit) => (
            <HabitBox key={habit.id}>
              <HabitInfo>
                <HabitName>{habit.name}</HabitName>
                <HabitSequence>
                  Sequência atual: <strong>{habit.currentSequence}</strong>
                  <br />
                  Seu recorde: <strong>{habit.highestSequence}</strong>
                </HabitSequence>
              </HabitInfo>
              <CheckButton
                done={habit.done}
                onClick={() => toggleHabitStatus(habit.id, habit.done)}
              >
                ✓
              </CheckButton>
            </HabitBox>
          ))
        ) : (
          <Message>Você ainda não tem hábitos cadastrados para hoje!</Message>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}

const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "numeric" };
  return today.toLocaleDateString("pt-BR", options);
};

const PageContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 20px;
  min-height: calc(100vh - 140px);
  box-sizing: border-box;
  background-color: rgba(242, 242, 242, 1);
`;

const Header = styled.div`
  margin-bottom: 20px;

  h1 {
    font-family: "Lexend Deca", sans-serif;
    font-size: 22.98px;
    font-weight: 400;
    line-height: 28.72px;
    color: rgba(18, 107, 165, 1);
  }
`;

const Message = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-size: 18px;
  color: rgba(102, 102, 102, 1);
  text-align: center;
`;

const HabitBox = styled.div`
  width: 335px;
  height: 94px;
  border: 1px solid rgba(231, 231, 231, 1);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
`;

const HabitInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HabitName = styled.h2`
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
  color: rgba(102, 102, 102, 1);
`;

const HabitSequence = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
`;

const CheckButton = styled.button`
  width: 69px;
  height: 69px;
  background-color: ${(props) =>
    props.done === true ? "rgba(76, 175, 80, 1)" : "rgba(211, 211, 211, 1)"};
  color: #fff;
  font-size: 30px;
  border: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
