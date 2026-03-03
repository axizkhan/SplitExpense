import { useState } from "react";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import GroupList from "../pages/dashboard/GroupList";
import ExpenseList from "../pages/GroupDetails/ExpenseList";
import "./App.css";

function App() {
  return (
    <>
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <GroupList /> */}
      <ExpenseList />
    </>
  );
}

export default App;
