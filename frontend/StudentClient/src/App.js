import React, { useState } from "react";
import AppRoutes from "./routing/routing";
import UserContext from "./userContext";

function App() {
  const [userId, setUserId] = useState(null);
  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <AppRoutes />
    </UserContext.Provider>
  );
}

export default App;
