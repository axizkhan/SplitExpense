import { useState } from "react";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import GroupList from "../pages/dashboard/GroupList";
import ExpenseList from "../pages/GroupDetails/ExpenseList";
import GroupMember from "../pages/GroupDetails/GroupMember";
import Journel from "../pages/GroupDetails/Journel";
import "./App.css";

function App() {
  return (
    <>
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <GroupList /> */}
      {/* <ExpenseList /> */}
      {/* <GroupMember /> */}
      <Journel />
    </>
  );
}

export default App;
