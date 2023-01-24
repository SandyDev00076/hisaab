import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  SecondaryButton,
  Tray,
} from "../style/shared";
import { ExpensesResponse, SetsResponse } from "../types/pocketbase-types";
import ExpenseTile from "./ExpenseTile";

const SetContainer = styled(Container)`
  gap: 32px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  & > button {
    flex: 1;
  }
`;

const AddButton = styled(PrimaryButton)`
  flex: 0.6;
`;

function Set() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpensesResponse[]>([]);
  const [set, setSet] = useState<SetsResponse>();

  function goToHome() {
    navigate("/");
  }

  async function deleteSet() {
    // logic of deletion of set
  }

  async function updateSet(total: number) {
    if (!id) return;
    try {
      const data = {
        ...set,
        expense: total,
      };

      const record = await pb.collection("sets").update<SetsResponse>(id, data);
      setSet(record);
    } catch (e) {
      console.error(e);
    }
  }

  function addAnExpense() {
    navigate(`/${id}/add`);
  }

  const totalExpense = useMemo(() => {
    let total = 0;
    expenses.forEach((expense) => {
      if (!expense.amount) return;
      total += expense.amount;
    });
    updateSet(total);
    return total;
  }, [expenses]);

  const getExpenses = useCallback(async () => {
    const filterQuery = `set = \"${id}\"`;
    const resultList = await pb
      .collection("expenses")
      .getList<ExpensesResponse>(1, 50, {
        filter: filterQuery,
      });
    setExpenses(resultList.items);
  }, [id]);

  const getSet = useCallback(async () => {
    if (!id) return;
    try {
      const record = await pb.collection("sets").getOne<SetsResponse>(id);
      setSet(record);
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getExpenses();
  }, [id]);

  useEffect(() => {
    // get the set via id
    getSet();
  }, []);

  return (
    <SetContainer>
      <Greeting>Set: {set && <strong>{set.name}</strong>}</Greeting>
      <Actions>
        <SecondaryButton onClick={goToHome}>Home</SecondaryButton>
        <DangerButton onClick={deleteSet}>Delete</DangerButton>
      </Actions>
      <ListContainer>
        <h3>
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
        </h3>
        {expenses.length > 0 ? (
          <List>
            {expenses.map((expense, index) => (
              <ExpenseTile
                expense={expense}
                key={index}
                onUpdate={getExpenses}
              />
            ))}
          </List>
        ) : (
          <EmptyUI>Add one to get started</EmptyUI>
        )}
      </ListContainer>
      <Tray>
        <Info>
          <h4>Total</h4>
          <Expense>{totalExpense.toFixed(2)}/-</Expense>
        </Info>
        <AddButton onClick={addAnExpense}>Add</AddButton>
      </Tray>
    </SetContainer>
  );
}

export default Set;
