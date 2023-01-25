import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import {
  Container,
  DangerButton,
  EmptyUI,
  Expense,
  Greeting,
  Info,
  List,
  ListContainer,
  PrimaryButton,
  Tray,
} from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import type { SetsResponse } from "../types/pocketbase-types";
import { formatCompact } from "../utils";

const HomeContainer = styled(Container)`
  gap: 32px;
`;

const SetItem = styled.button`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  font-size: ${Sizes.medium};
  background-color: transparent;
  width: 100%;
  border: 1px solid ${Colors.bgLight25};
  border-radius: 10px;
  outline: none;
  margin-bottom: 10px;

  &:hover {
    border-color: ${Colors.white};
  }

  & .name {
    color: ${Colors.text};
  }

  & .expense {
    color: ${Colors.accent};
  }
`;

const AddButton = styled(PrimaryButton)`
  flex: 0.6;
`;

const LogoutButton = styled(DangerButton)`
  margin-bottom: 64px;
`;

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sets, setSets] = useState<SetsResponse[]>([]);

  function logout() {
    pb.authStore.clear();
    navigate(0);
  }

  const totalExpense = useMemo(() => {
    let total = 0;
    sets.forEach((set) => {
      if (!set.expense) return;
      total += set.expense;
    });
    return total;
  }, [sets]);

  function addASet() {
    navigate("add");
  }

  function goToSet(setId: string) {
    navigate(setId);
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
          .getList<SetsResponse>(1, 50, {
            filter: filterQuery,
          });
        setSets(resultList.items);
      }
      getSets();
    }
  }, []);

  return (
    <HomeContainer>
      <Greeting>
        Hello <strong>{name}</strong>
      </Greeting>
      <ListContainer>
        <h3>
          {sets.length} {sets.length === 1 ? "set" : "sets"}
        </h3>
        {sets.length > 0 ? (
          <List>
            {sets.map((set) => (
              <SetItem key={set.name} onClick={() => goToSet(set.id)}>
                <div className="name">{set.name}</div>
                <div className="expense">{set.expense?.toFixed(2)}</div>
              </SetItem>
            ))}
          </List>
        ) : (
          <EmptyUI>Add one to get started</EmptyUI>
        )}
      </ListContainer>
      <LogoutButton onClick={logout}>Logout</LogoutButton>
      <Tray>
        <Info>
          <h4>Total</h4>
          <Expense>{formatCompact().format(totalExpense)}</Expense>
        </Info>
        <AddButton onClick={addASet}>Add</AddButton>
      </Tray>
    </HomeContainer>
  );
}

export default Home;
