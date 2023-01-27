import SignUp from "./SignUp";
import AddSet from "./AddSet";
import Set from "./Set";
import AddExpense from "./AddExpense";
import App from "../App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { useLoading } from "../data/loadingContext";
import Loading from "./Loading";

const Container = styled.section`
  height: 100%;
  position: relative;
`;

function RouteContainer() {
  const { state } = useLoading();
  return (
    <Container>
      {state.loading && <Loading />}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="add" element={<AddSet />} />
          <Route path="/:id" element={<Set />} />
          <Route path="/:id/add" element={<AddExpense />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default RouteContainer;
