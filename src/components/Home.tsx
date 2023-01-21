import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import { Container, Filler, Greeting, PrimaryButton } from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import type { SetsRecord } from "../types/pocketbase-types";

const HomeContainer = styled(Container)`
  gap: 32px;
`;

const Info = styled.div`
  text-align: center;

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

const ListContainer = styled.section`
  & > h3 {
    color: ${Colors.text};
    font-size: ${Sizes.medium};
    margin-bottom: 5px;
  }
`;

const List = styled.ul`
  list-style: none;
`;

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [sets, setSets] = useState<SetsRecord[]>([]);

  function logout() {
    pb.authStore.clear();
    navigate(0);
  }

  useEffect(() => {
    if (pb.authStore.model) {
      setName(pb.authStore.model.name);
      const userId = pb.authStore.model.id;
      // get all sets with this userId
      async function getSets() {
        const filterQuery = `userId = \'${userId}\'`;
        const resultList = await pb
          .collection("sets")
          .getList<SetsRecord>(1, 50, {
            filter: filterQuery,
          });
        setSets(resultList.items);
      }
      getSets();
    }
  }, []);

  return (
    <HomeContainer>
      <Greeting>Hello {name}</Greeting>
      <Info>
        <h3>Total expense</h3>
        <Expense>{totalExpense.toFixed(2)}/-</Expense>
      </Info>
      <ListContainer>
        <h3>
          {sets.length} {sets.length === 1 ? "set" : "sets"}
        </h3>
        {sets.length > 0 && <List></List>}
      </ListContainer>
      <Filler />
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </HomeContainer>
  );
}

export default Home;
