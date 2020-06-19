import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { persistor, store } from "./store";

import Pages from "./pages/";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  );
}

export default App;
