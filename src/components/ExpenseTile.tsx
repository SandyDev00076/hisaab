import styled from "@emotion/styled";
import { LegacyRef, useEffect, useRef, useState } from "react";
import pb from "../lib/pocketbase";
import { Colors, Sizes } from "../style/variables";
import { ExpensesResponse } from "../types/pocketbase-types";
import { debounce, handleStringAsDecimal } from "../utils";
import { ReactComponent as DeleteIcon } from "../assets/delete.svg";
import { ReactComponent as DoneIcon } from "../assets/done.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { DangerIconButton, PrimaryIconButton } from "../style/shared";
import Button from "./Button";

interface IProps {
  expense: ExpensesResponse;
  onUpdate: Function;
}

const Container = styled.div`
  position: relative;
`;

const DeleteButton = styled(DangerIconButton)``;

const DoneButton = styled(PrimaryIconButton)``;

const Actions = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
`;

interface IExpenseItemProps {
  done?: boolean;
}

const ExpenseItem = styled(Button)(({ done }: IExpenseItemProps) => ({
  position: "relative",
  zIndex: 2,
  backgroundColor: Colors.bg,
  width: "100%",
  borderRadius: "10px",
  margin: !done ? "4px 2px 10px 2px" : "0 0 6px 0",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  outline: "none",
  border: done ? `2px solid ${Colors.success}` : "none",
  transition: "translate ease-in-out 250ms",
}));

const Amount = styled.input`
  color: ${Colors.accent};
  font-size: ${Sizes.medium};
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

interface INameProps {
  done?: boolean;
}

const Name = styled.div(({ done }: INameProps) => ({
  fontSize: Sizes.medium,
  color: Colors.text,
  textAlign: "start",
  wordBreak: "break-all",
  textDecoration: done ? "line-through" : "none",
}));

function ExpenseTile({ expense, onUpdate }: IProps) {
  const amountRef = useRef<HTMLInputElement>();
  const [amount, setAmount] = useState<string>(`${expense.amount?.toFixed(2)}`);
  const [actionToggle, showActions] = useState(false);

  const expenseItemRef = useRef<HTMLButtonElement>(null);
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
      if (
        e.target instanceof Node &&
        !containerRef.current?.contains(e.target) &&
        actionToggle
      ) {
        // clicked outside container
        showActions(false);
      }
    };
  }, [actionToggle]);

  useEffect(() => {
    const updateRecord = debounce(async () => {
      const data = {
        ...expense,
        amount: parseFloat(amount),
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
      const amountLength = amount.length;
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    const newVal = handleStringAsDecimal(val);
    if (newVal) setAmount(newVal);
  }

  async function toggleDone() {
    const data = {
      ...expense,
      done: !expense.done,
    };
    try {
      await pb.collection("expenses").update(expense.id, data);
      onUpdate();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container ref={containerRef as LegacyRef<HTMLDivElement>}>
      <ExpenseItem
        done={expense.done}
        onClick={(e) => {
          if (e.target instanceof Node && amountRef.current?.contains(e.target))
            return;
          showActions((prev) => !prev);
        }}
        ref={expenseItemRef}
      >
        <Name done={expense.done}>{expense.name}</Name>
        <Amount
          value={amount}
          onChange={handleChange}
          ref={amountRef as LegacyRef<HTMLInputElement>}
          inputMode="numeric"
        />
      </ExpenseItem>
      <Actions>
        <DeleteButton onClick={deleteExpense}>
          <DeleteIcon />
        </DeleteButton>
        <DoneButton onClick={toggleDone}>
          {!expense.done ? <DoneIcon /> : <CloseIcon />}
        </DoneButton>
      </Actions>
    </Container>
  );
}

export default ExpenseTile;
