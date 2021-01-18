import { Paper, Toolbar, Typography } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";

import styles from "./event.module.scss";
import Modal from "../../components/Modal";
import Tabs from "../../components/Tabs/Tabs";
import EventCategory from "./EventCategory";
import Events from "./Events";

const EnhancedTableToolbar = ({ className }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={className}>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Event Management
      </Typography>

      <div style={{ marginLeft: "auto" }}>
        <Modal type='Add' />
      </div>
    </Toolbar>
  );
};

export default function Event() {
  const classes = useStyles();

  const tabHeading = ["Event Category", "Event"];
  const tabContent = [<EventCategory />, <Events />];

  return (
    <Paper className={classes.paper} style={{ margin: 10 }}>
      <EnhancedTableToolbar className={styles.toolbar} />
      <Tabs TabHeading={tabHeading}>{tabContent}</Tabs>
    </Paper>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
}));

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#F2F2F2",
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));
