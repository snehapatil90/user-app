import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      {/* Routing  */}
      <Router>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link className="brand" to="/">
                User App
              </Link>
            </div>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={UserList}></Route>
            </Switch>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
