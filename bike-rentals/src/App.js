import React from "react";
import AppRoutes from "./Modules/Routes/AppRoutes";
import { GlobalProvider } from "./Modules/Context/GlobalState";

const App = () => (
  <GlobalProvider>
    <AppRoutes />
  </GlobalProvider>
);

export default App;
