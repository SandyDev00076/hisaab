import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import { Container, Greeting, PrimaryButton } from "../style/shared";
import { Colors, Sizes } from "../style/variables";

const HomeContainer = styled(Container)`
  gap: 32px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h3 {
    color: ${Colors.text};
    font-size: ${Sizes.medium};
    margin-bottom: 5px;
  }
`;

const Expense = styled.h1`
  color: ${Colors.accent};
  font-size: ${Sizes.xxLarge};
`;

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  function logout() {
    pb.authStore.clear();
    navigate(0);
  }

  useEffect(() => {
    if (pb.authStore.model) {
      setUserId(pb.authStore.model.id);
      setName(pb.authStore.model.name);
    }
  }, []);

  return (
    <HomeContainer>
      <Greeting>Hello {name}</Greeting>
      <Info>
        <h3>Total expense</h3>
        <Expense>{totalExpense.toFixed(2)}/-</Expense>
      </Info>
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </HomeContainer>
  );
}

export default Home;
