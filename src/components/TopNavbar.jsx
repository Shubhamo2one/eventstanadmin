import React from "react";
// import {useContext} from 'react'
import { AppBar,  Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";

// import UserContext from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#8489B2",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "exotic",
    textTransform: "uppercase",
    fontSize: "32.5px",
    color: "#fff",
  },
}));

const TopNavbar = () => {
  const classes = useStyles();
  // const { userData, setUserData } = useContext(UserContext);
  // const logout = () => {
  //   axios
  //     .put(
  //       "https://api.eventstan.com/admin/logout",
  //       {},
  //       {
  //         headers: {
  //           authorization: userData.token,
  //         },
  //       }
  //     )
  //     .then(
  //       (res) => {
  //         localStorage.removeItem("auth-token");
  //         setUserData({
  //           token: "",
  //         });
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     )
  //     .catch(function (error) {
  //       if (error.response) {
  //         // Request made and server responded
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         // The request was made but no response was received
  //         console.log(error.request);
  //       } else {
  //         // Something happened in setting up the request that triggered an Error
  //         console.log("Error", error.message);
  //       }
  //     });
  // };
  return (
    <div className={classes.root}>
      <AppBar position='static' elevation={0} className={classes.appbar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Event<span style={{ color: "#f47824" }}>stan</span>
          </Typography>
          {/* <Button
            variant='contained'
            style={{ marginRight: 5 }}
            onClick={logout}
          >
            Logout
          </Button> */}
          {/* <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXp3DxP80ArpRzsB0XWBG9Ow5GeuefbLrUHw&usqp=CAU' /> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopNavbar;
