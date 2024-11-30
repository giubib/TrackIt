import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import Top from "../Components/Top";
import Footer from "../Components/Footer";
import { UserContext } from "../Contexts/UserContext";

export function HabitsPage() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.token) {
      fetchHabits(user.token);
    }
  }, [user?.token]);

  const fetchHabits = async (userToken) => {
    if (!userToken) return;

    const token = "Bearer " + userToken;
    try {
      const response = await axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          headers: { Authorization: token },
        }
      );
      setHabits(response.data);
    } catch (err) {
      console.log("Error fetching habits:", err);
      alert("Erro ao carregar os hábitos. Tente novamente.");
    }
  };

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const toggleDay = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((day) => day !== index));
    } else {
      setSelectedDays([...selectedDays, index]);
    }
  };

  const handleSave = async () => {
    if (!habitName.trim() || selectedDays.length === 0) {
      alert("Por favor, preencha o nome do hábito e selecione os dias.");
      return;
    }

    const token = "Bearer " + user.token;

    setLoading(true);

    try {
      await axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        { name: habitName, days: selectedDays },
        {
          headers: { Authorization: token },
        }
      );

      setHabitName("");
      setSelectedDays([]);
      setIsBoxOpen(false);
      fetchHabits(user.token); 
    } catch (err) {
      console.log("Error saving habit:", err);
      alert("Erro ao salvar o hábito. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Top />
      <PageContainer>
        <StyledH1>Meus hábitos</StyledH1>
        <AddButton onClick={toggleBox}>+</AddButton>
        {isBoxOpen && (
          <Box>
            <InputBox
              type="text"
              placeholder="nome do hábito"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              disabled={loading}
            />
            <DaysContainer>
              {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                <LittleBox
                  key={index}
                  selected={selectedDays.includes(index)}
                  onClick={() => toggleDay(index)}
                  disabled={loading}
                >
                  {day}
                </LittleBox>
              ))}
            </DaysContainer>
            <ButtonContainer>
              <CancelButton onClick={toggleBox} disabled={loading}>
                Cancelar
              </CancelButton>
              <SaveButton onClick={handleSave} disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </SaveButton>
            </ButtonContainer>
          </Box>
        )}
        {habits.length > 0 ? (
          <HabitsList>
            {habits.map((habit) => (
              <Habit key={habit.id}>
                <HabitName>{habit.name}</HabitName>
                <DaysContainer>
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                    <LittleBox
                      key={index}
                      selected={habit.days.includes(index)}
                      disabled
                    >
                      {day}
                    </LittleBox>
                  ))}
                </DaysContainer>
              </Habit>
            ))}
          </HabitsList>
        ) : (
          <Message>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </Message>
        )}
      </PageContainer>
      <Footer />
    </>
  );
}

const StyledH1 = styled.h1`
  width: 148px;
  height: 29px;
  font-size: 22px;
  font-weight: 400;
  margin: 17px 0;
  font-family: "Lexend Deca", sans-serif;
  color: rgba(18, 107, 165, 1);
`;

const PageContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  padding: 20px;
  min-height: calc(100vh - 140px);
  box-sizing: border-box;
  background-color: rgba(242, 242, 242, 1);
`;

const AddButton = styled.button`
  width: 40px;
  height: 35px;
  position: absolute;
  top: 95px;
  left: 317px;
  border-radius: 4.64px;
  background-color: rgba(82, 182, 255, 1);
  border: none;
  cursor: pointer;
  font-size: 27px;
  font-weight: 400;
  color: white;
`;

const Message = styled.p`
  width: 338px;
  height: 74px;
  font-size: 17.98px;
  font-weight: 400;
  margin: 17px 0;
  font-family: "Lexend Deca", sans-serif;
  color: rgba(102, 102, 102, 1);
  top: 155px;
  left: 17px;
`;

const Box = styled.div`
  width: 90%;
  padding: 20px 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const InputBox = styled.input`
  width: 88%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid rgba(212, 212, 212, 1);
  padding-left: 10px;
  font-size: 16px;
  color: rgba(212, 212, 212, 1);
  font-family: "Lexend Deca", sans-serif;
  margin-top: 15px;
  margin-left: 12px;
  &::placeholder {
    color: rgba(212, 212, 212, 1);
  }
`;

const DaysContainer = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 12px;
  gap: 5px;
`;

const LittleBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ selected }) =>
    selected ? "white" : "rgba(212, 212, 212, 1)"};
  background-color: ${({ selected }) =>
    selected ? "rgba(207, 207, 207, 1)" : "white"};
  border: 1px solid rgba(212, 212, 212, 1);
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  margin-right: 12px;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: rgba(82, 182, 255, 1);
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: rgba(82, 182, 255, 1);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 15px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 16px;
  cursor: pointer;
`;

const HabitsList = styled.div`
  margin-top: 20px;
`;

const Habit = styled.div`
  margin-bottom: 15px;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`;

const HabitName = styled.h2`
  font-size: 20px;
  font-weight: 400;
  color:rgba(102, 102, 102, 1);
  margin-bottom: 10px;
  font-family: "Lexend Deca", sans-serif;

`;

