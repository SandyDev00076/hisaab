import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
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
import { Colors, Sizes } from "../style/variables";
import { ItemsRecord } from "../types/pocketbase-types";
import { debounce, handleStringAsDecimal } from "../utils";
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

const Suggestions = styled.div`
  display: flex;
  padding-inline: 10px;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Suggestion = styled.button`
  font-size: ${Sizes.xxSmall};
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 10px;
  background-color: ${Colors.bgLight25};
  border: none;
  outline: none;
`;

function AddExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDesc] = useState("");
  const [suggestions, setSuggestions] = useState<ItemsRecord[]>([]);
  const [suggestionToggle, setSuggestionsToggle] = useState(true);

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
      // store the expense in the Items collection asynchronously
      pb.collection("items").create({
        item: name.toLocaleLowerCase(),
      });

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

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSuggestionsToggle(true);
    setName(e.target.value);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let val = e.target.value;
    const newVal = handleStringAsDecimal(val);
    if (newVal) setAmount(newVal);
  }

  function handleSuggestionClick(item: string) {
    setName(item);
    setSuggestionsToggle(false);
    setSuggestions([]);
  }

  useEffect(() => {
    const fetchSuggestions = debounce(async () => {
      try {
        if (!name) {
          setSuggestions([]);
          return;
        }
        const records = await pb
          .collection("items")
          .getList<ItemsRecord>(1, 5, {
            filter: `item ~ \"%${name}%\"`,
          });
        setSuggestions(records.items);
      } catch (e) {
        console.error(e);
      }
    }, 500);
    fetchSuggestions();
  }, [name]);

  return (
    <AddExpenseContainer>
      <Greeting>Add an expense</Greeting>
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <AddExpenseField label="Name">
          <AddExpenseInput
            name="expense-name"
            value={name}
            onChange={handleNameChange}
            autoFocus
          />
        </AddExpenseField>
        {suggestions && suggestions.length > 0 && suggestionToggle && (
          <Suggestions>
            {suggestions.map((suggestion) => (
              <Suggestion
                onClick={() => handleSuggestionClick(suggestion.item)}
                key={suggestion.item}
              >
                {suggestion.item}
              </Suggestion>
            ))}
          </Suggestions>
        )}
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
