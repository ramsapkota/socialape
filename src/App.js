import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./component/Navbar";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute.js";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/type";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import store from "./redux/store";
import axios from "axios";

const theme = createMuiTheme(themeObject);
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
