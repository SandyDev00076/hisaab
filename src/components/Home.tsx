import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import {
  Container,
  DangerButton,
  Filler,
  Greeting,
  PrimaryButton,
  Tray,
} from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import type { SetsRecord } from "../types/pocketbase-types";
import { ReactComponent as LogoutIcon } from "../assets/logout.svg";

const HomeContainer = styled(Container)`
  gap: 32px;
`;

const Info = styled.div`
  & > h4 {
    margin-bottom: 10px;
    font-size: ${Sizes.xSmall};
    color: ${Colors.secondaryText};
  }
`

const Expense = styled.h1`
  color: ${Colors.accent};
  font-size: ${Sizes.xLarge};
  flex: 1;
  line-height: 0.7;
`;

const ListContainer = styled.section`
  width: 100%;
  & > h3 {
    color: ${Colors.text};
    font-size: ${Sizes.medium};
    margin-bottom: 10px;
    text-align: center;
  }
`;

const List = styled.div`
  width: 100%;
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

const EmptyUI = styled.div`
  color: ${Colors.secondaryText};
  font-size: ${Sizes.medium};
  text-align: center;
`;

const AddButton = styled(PrimaryButton)`
  flex: 0.6;
`;

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sets, setSets] = useState<SetsRecord[]>([]);

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
      <ListContainer>
        <h3>
          {sets.length} {sets.length === 1 ? "set" : "sets"}
        </h3>
        {sets.length > 0 ? (
          <List>
            {sets.map((set) => (
              <SetItem>
                <div className="name">{set.name}</div>
                <div className="expense">{set.expense?.toFixed(2)}</div>
              </SetItem>
            ))}
          </List>
        ) : (
          <EmptyUI>Add one to get started</EmptyUI>
        )}
      </ListContainer>
      <Filler />
      <Tray>
        <Info>
          <h4>Total</h4>
          <Expense>{totalExpense.toFixed(2)}/-</Expense>
        </Info>
        <AddButton onClick={addASet}>
          Add
        </AddButton>
      </Tray>
    </HomeContainer>
  );
}

export default Home;
