import React, { useState } from "react";
import Navigator from "./navigation/navigator";
import UserContext from "./userContext";

export default function App() {
  const [userId, setUserId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Navigator />
    </UserContext.Provider>
  );
}
