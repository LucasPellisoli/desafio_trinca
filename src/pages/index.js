import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./login";
import Main from "./main";
import Barbecue from "./barbecue";
import Cadastro from "./cadastrar";

function myRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/cadastrar" component={Cadastro} />
        <Route path="/barbecue/:id" component={Barbecue} />
      </Switch>
    </Router>
  );
}

export default myRouter;
