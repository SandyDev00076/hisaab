import styled from "@emotion/styled";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import {
  Container,
  DangerButton,
  DangerIconButton,
  EmptyUI,
  Expense,
  Filler,
  Greeting,
  Info,
  List,
  ListContainer,
  PrimaryButton,
  PrimaryIconButton,
  SecondaryButton,
  Tray,
} from "../style/shared";
import { ExpensesResponse, SetsResponse } from "../types/pocketbase-types";
import ExpenseTile from "./ExpenseTile";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { Colors, Sizes } from "../style/variables";

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

const DeleteConfirmation = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & > h5 {
    color: ${Colors.text};
    font-size: ${Sizes.large};
  }
`;

function Set() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpensesResponse[]>([]);
  const [set, setSet] = useState<SetsResponse>();
  const [deleteConfirmation, showDeleteConfirmation] = useState(false);

  function goToHome() {
    navigate("/");
  }

  async function deleteSet() {
    // deleting the set
    if (!id) return;
    try {
      await pb.collection("sets").delete(id);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
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
      {deleteConfirmation ? (
        <DeleteConfirmation>
          <h5>Sure ?</h5>
          <Filler />
          <DangerIconButton onClick={deleteSet}>
            <DeleteIcon />
          </DangerIconButton>
          <PrimaryIconButton onClick={() => showDeleteConfirmation(false)}>
            <CloseIcon />
          </PrimaryIconButton>
        </DeleteConfirmation>
      ) : (
        <Actions>
          <SecondaryButton onClick={goToHome}>Home</SecondaryButton>
          <DangerButton onClick={() => showDeleteConfirmation(true)}>
            Delete
          </DangerButton>
        </Actions>
      )}
      <ListContainer>
        <h3>
          {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
        </h3>
        {expenses.length > 0 ? (
          <List>
            {expenses.map((expense) => (
              <ExpenseTile
                expense={expense}
                key={expense.id}
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
