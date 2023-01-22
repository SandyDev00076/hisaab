import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pb from "../lib/pocketbase";
import {
  Container,
  Form,
  Greeting,
  Input,
  PrimaryButton,
  SecondaryButton,
  Tray,
} from "../style/shared";
import { Sizes } from "../style/variables";
import Field from "./Field";

const AddSetContainer = styled(Container)`
  gap: 32px;
`;

const AddSetInput = styled(Input)`
  font-size: ${Sizes.large};
`;

function AddSet() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  function goBack() {
    navigate(-1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  async function addSet() {
    const data = {
      name,
      expense: 0,
      userId: pb.authStore.model?.id,
    };
    try {
      await pb.collection("sets").create(data);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AddSetContainer>
      <Greeting>Add a set</Greeting>
      <Form onSubmit={handleSubmit}>
        <Field label="Name">
          <AddSetInput
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </Field>
      </Form>
      <Tray>
        <SecondaryButton onClick={goBack}>Cancel</SecondaryButton>
        <PrimaryButton disabled={!name} onClick={addSet}>
          Add
        </PrimaryButton>
      </Tray>
    </AddSetContainer>
  );
}

export default AddSet;
