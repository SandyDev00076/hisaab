import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../data/loadingContext";
import pb from "../lib/pocketbase";
import {
  Container,
  DangerIconButton,
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
import Button from "./Button";
import Separator from "./Separator";
import { ReactComponent as LogoutIcon } from "../assets/logout.svg";

const HomeContainer = styled(Container)`
  gap: 32px;
`;

const SetItem = styled(Button)`
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

const LogoutButton = styled(DangerIconButton)``;
const InvisibleButton = styled(DangerIconButton)`
  visibility: hidden;
`;

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sets, setSets] = useState<SetsResponse[]>([]);
  const { showLoading, hideLoading } = useLoading();

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
        showLoading();
        const resultList = await pb
          .collection("sets")
          .getList<SetsResponse>(1, 50, {
            filter: filterQuery,
          });
        hideLoading();
        setSets(resultList.items);
      }
      getSets();
    }
  }, []);

  let currText = ""; // current separator text

  return (
    <HomeContainer>
      <Greeting>
        <InvisibleButton />
        <span>
          Hello <strong>{name}</strong>
        </span>
        <LogoutButton onClick={logout}>
          <LogoutIcon />
        </LogoutButton>
      </Greeting>
      <ListContainer>
        <h3>
          {sets.length} {sets.length === 1 ? "set" : "sets"}
        </h3>
        {sets.length > 0 ? (
          <List>
            {sets.map((set) => {
              const setDate = new Date(set.created);
              const setMonth = new Intl.DateTimeFormat("en-IN", {
                month: "long",
              }).format(setDate);
              const setYear = new Intl.DateTimeFormat("en-IN", {
                year: "2-digit",
              }).format(setDate);
              const separatorText = `${setMonth} ${setYear}`;
              const showSeparator = currText !== separatorText;
              currText = separatorText;
              return (
                <>
                  {showSeparator && <Separator text={separatorText} />}
                  <SetItem key={set.name} onClick={() => goToSet(set.id)}>
                    <div className="name">{set.name}</div>
                    <div className="expense">{set.expense?.toFixed(2)}</div>
                  </SetItem>
                </>
              );
            })}
          </List>
        ) : (
          <EmptyUI>Add one to get started</EmptyUI>
        )}
      </ListContainer>
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
