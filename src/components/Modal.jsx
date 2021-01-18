import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

import BootStrapButton from "./BootstrapButton";

export default function Modal({ type, children, text, setText }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(text);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setEdit(event.target.value);
  };

  let disabled = type === "View" || type === "Delete" ? true : false;

  return (
    <>
      {children ? (
        <div onClick={handleOpen}>{children}</div>
      ) : (
        <BootStrapButton
          variant='contained'
          color='primary'
          onClick={handleOpen}
        >
          Add Category
        </BootStrapButton>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <div className={classes.title}>
          <DialogTitle id='form-dialog-title'>
            <span>{type} Category</span>
          </DialogTitle>
          <IconButton
            className={classes.closeButton}
            onClick={handleClose}
            color='primary'
          >
            <Close />
          </IconButton>
        </div>
        <DialogContent>
          <TextField
            margin='dense'
            id='name'
            variant='outlined'
            fullWidth
            className={classes.textField}
            disabled={disabled}
            value={edit}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.addButton}
            onClick={handleClose}
            color={type === "Delete" ? "secondary" : "primary"}
            variant='contained'
            style={type === "View" ? { display: "none" } : {}}
          >
            {type}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles(() => ({
  addButton: {
    width: "100%",
    margin: 20,
  },
  closeButton: {
    paddingRight: 20,
  },
  textField: {
    backgroundColor: "#c4c4c4",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
