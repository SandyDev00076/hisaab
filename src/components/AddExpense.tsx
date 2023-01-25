import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pb from "../lib/pocketbase";
import {
  Container,
  Form,
  Greeting,
  Input,
  PrimaryButton,
  SecondaryButton,
  TextField,
  Tray,
} from "../style/shared";
import { Sizes } from "../style/variables";
import { handleStringAsDecimal } from "../utils";
import Field from "./Field";

const AddExpenseContainer = styled(Container)`
  gap: 32px;
`;

const AddExpenseInput = styled(Input)`
  font-size: ${Sizes.medium};
`;

const AddExpenseField = styled(Field)`
  display: block;
  margin-bottom: 16px;
`;

const AddExpenseTextField = styled(TextField)`
  font-size: ${Sizes.medium};
`;

function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDesc] = useState("");

  const navigate = useNavigate();
  const { id: set } = useParams();

  function goBack() {
    navigate(-1);
  }

  async function addExpense() {
    if (!name || !amount || !set) return;
    const data = {
      set,
      amount: parseFloat(amount),
      name,
      description,
    };
    try {
      await pb.collection("expenses").create(data);
      navigate(`/${set}`);
    } catch (e) {
      console.error(e);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter") {
      // enter was pressed
      addExpense();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    const newVal = handleStringAsDecimal(val);
    if (newVal) setAmount(newVal);
  }

  return (
    <AddExpenseContainer>
      <Greeting>Add an expense</Greeting>
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <AddExpenseField label="Name">
          <AddExpenseInput
            name="expense-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </AddExpenseField>
        <AddExpenseField label="Amount">
          <AddExpenseInput
            name="amount"
            value={amount}
            onChange={handleChange}
          />
        </AddExpenseField>
        <AddExpenseField label="Description">
          <AddExpenseTextField
            name="description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
          />
        </AddExpenseField>
      </Form>
      <Tray>
        <SecondaryButton onClick={goBack}>Cancel</SecondaryButton>
        <PrimaryButton disabled={!name || !amount} onClick={addExpense}>
          Add
        </PrimaryButton>
      </Tray>
    </AddExpenseContainer>
  );
}

export default AddExpense;
