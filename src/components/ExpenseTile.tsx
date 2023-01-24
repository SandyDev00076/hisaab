import styled from "@emotion/styled";
import { LegacyRef, useEffect, useRef, useState } from "react";
import pb from "../lib/pocketbase";
import { Colors, Sizes } from "../style/variables";
import { ExpensesResponse } from "../types/pocketbase-types";
import { debounce } from "../utils";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { DangerIconButton } from "../style/shared";

interface IProps {
  expense: ExpensesResponse;
  onUpdate: Function;
}

const Container = styled.div`
  position: relative;
`;

const DeleteButton = styled(DangerIconButton)`
  position: absolute;
  right: 10px;
  top: 12px;
  z-index: 1;
`;

const ExpenseItem = styled.button`
  position: relative;
  z-index: 2;
  background-color: ${Colors.bg};
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  border: none;
  transition: translate ease-in-out 300ms;
`;

const Amount = styled.input`
  color: ${Colors.accent};
  font-size: ${Sizes.large};
  background: none;
  width: max-content;
  outline: none;
  border: none;
  font-family: inherit;
  padding-bottom: 2px;
  border-bottom: 1px solid ${Colors.accent};
  width: 50%;
  text-align: end;
`;

const Name = styled.div`
  font-size: ${Sizes.medium};
  color: ${Colors.text};
`;

function ExpenseTile({ expense, onUpdate }: IProps) {
  const amountRef = useRef<HTMLInputElement>();
  const [amount, setAmount] = useState(expense.amount);
  const [actionToggle, showActions] = useState(false);

  const expenseItemRef = useRef<HTMLButtonElement>();
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!expenseItemRef.current || !containerRef.current) return;
    if (actionToggle) {
      // show actions
      expenseItemRef.current.classList.add("slideToLeft");
    } else {
      expenseItemRef.current.classList.remove("slideToLeft");
    }

    // logic to detect backdrop click
    window.onclick = (e) => {
      if (e.target instanceof Node && !containerRef.current?.contains(e.target) && actionToggle) {
        // clicked outside container
        showActions(false);
      }
    }
  }, [actionToggle]);

  useEffect(() => {
    const updateRecord = debounce(async () => {
      const data = {
        ...expense,
        amount,
      };
      try {
        await pb.collection("expenses").update(expense.id, data);
        onUpdate();
      } catch (e) {
        console.error(e);
      }
    }, 200);

    updateRecord();

    if (amountRef.current) {
      const amountLength = String(amount).length;
      amountRef.current.style.width = `${
        amountLength > 3 ? amountLength + 0.5 : 4
      }ch`;
    }
  }, [amount]);

  async function deleteExpense() {
    // deleting the expense
    try {
      await pb.collection("expenses").delete(expense.id);
      onUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container ref={containerRef as LegacyRef<HTMLDivElement>}>
      <ExpenseItem
        onClick={() => showActions((prev) => !prev)}
        ref={expenseItemRef as LegacyRef<HTMLButtonElement>}
      >
        <Name>{expense.name}</Name>
        <Amount
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          ref={amountRef as LegacyRef<HTMLInputElement>}
          inputMode="numeric"
        />
      </ExpenseItem>
      <DeleteButton onClick={deleteExpense}>
        <DeleteIcon />
      </DeleteButton>
    </Container>
  );
}

export default ExpenseTile;
