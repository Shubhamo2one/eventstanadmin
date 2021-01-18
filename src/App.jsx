import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { HomeOutlined } from "@material-ui/icons";

import TopNavbar from "./components/TopNavbar";
import Event from "./pages/Event/Event";
import Services from "./pages/Services";
import Filter from "./pages/Filter";
import UserContext from "./context/userContext";
import Login from "./pages/Login";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    }

    setUserData({
      token,
    });
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div className='App'>
        <UserContext.Provider value={{ userData, setUserData }}>
          {userData.token ? (
            <>
              <TopNavbar />

              <Grid container>
                <Grid
                  item
                  xs={2}
                  style={{
                    backgroundColor: "#8489B2",
                    paddingTop: "40px",
                    minHeight: "100vh",
                  }}
                >
                  <List component='nav'>
                    <ListItem>
                      <ListItemIcon>
                        <HomeOutlined style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary='Dashboard'
                        style={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem style={{ color: "#CDCFDF" }}>MANAGEMENT</ListItem>
                    <ListItem button component={Link} to='/services'>
                      <ListItemText
                        primary='Services'
                        style={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem button component={Link} to='/filter'>
                      <ListItemText
                        primary='Filter'
                        style={{ color: "white" }}
                      />
                    </ListItem>
                    <ListItem button component={Link} to='/event'>
                      <ListItemText
                        primary='Event Management'
                        style={{ color: "white" }}
                      />
                    </ListItem>
                    {/* <ListItem button component={Link} to='/'>
                      <ListItemIcon>
                        <ExitToApp style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary='Logout'
                        style={{ color: "white" }}
                      />
                    </ListItem> */}
                  </List>
                </Grid>
                <Grid item xs={10}>
                  <Switch>
                    <Route path='/event'>
                      <Event />
                    </Route>
                    <Route path='/filter'>
                      <Filter />
                    </Route>
                    <Route path='/services'>
                      <Services />
                    </Route>

                    <Route path='/'>
                      <Services />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </>
          ) : (
            <Login />
          )}
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
