import React, { useState } from "react";
import { Box, Tab, Tabs, makeStyles } from "@material-ui/core";

import styles from "./tab.module.scss";

function TabPanel({ children, value, index, ...otherProps }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`event-tabpanel-${index}`}
      aria-labelledby={`event-tab-${index}`}
      {...otherProps}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `event-tab-${index}`,
    "aria-controls": `event-tabpanel-${index}`,
  };
}

export default function CustomTabs({ TabHeading, children }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='event tabs'
        className={styles.tabContainer}
      >
        {TabHeading.map((value, index) => {
          return (
            <Tab
              className={styles.tabButton}
              key={index}
              label={value}
              disableRipple
              {...a11yProps(0)}
            />
          );
        })}
      </Tabs>
      {children.map((child, index) => {
        return (
          <TabPanel key={"Tabpanel" + index} value={value} index={index}>
            {child}
          </TabPanel>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
