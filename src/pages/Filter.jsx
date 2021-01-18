import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import BootstrapButton from "../components/BootstrapButton";
import IconButton from "@material-ui/core/IconButton";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import Modal from "../components/Modal";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F2F2F2",
    color: "#787878",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(index, name, type, filters) {
  return { index, name, type, filters };
}

const rows = [
  createData(1, "Select Date Range", "Date Range", ["Date Range"]),
  createData(2, "Select Time Range", "Time Range", ["Time Range"]),
  createData(3, "Select location", "Location", ["Location"]),
  createData(4, "Select you venue", "Location", ["Location"]),
  createData(5, "Single Select", "Single Select", ["Single Select"]),
  createData(6, "Multi Select", "Multi Select", ["Multi Select"]),
  createData(7, "Select numbers of members", "Range", ["Range"]),
  createData(8, "Select Time", "Time", ["Time"]),
  createData(9, "Select date", "Date", ["Date"]),
];

const headCells = [
  {
    id: "index",
    numeric: true,
    disablePadding: false,
    label: "S No",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  { id: "type", numeric: false, disablePadding: false, label: "Type" },
  { id: "filter", numeric: false, disablePadding: false, label: "Filter" },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </StyledTableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Filter List
      </Typography>

      <div style={{ marginLeft: "auto" }}>
        <BootstrapButton variant='contained' color='primary' disableRipple>
          Add Filter
        </BootstrapButton>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    backgroundColor: "#F2F2F2",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
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

export default function EnhancedTable() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root} style={{ margin: 10 }}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table className={classes.table} size='small'>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding='checkbox'>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align='left' width={75}>
                      {row.index}
                    </StyledTableCell>
                    <StyledTableCell align='left' width={120}>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='left' width={100}>
                      {row.type}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {row.filters.map((f) => (
                        <span key={f} style={{ padding: "5px" }}>
                          {f}
                        </span>
                      ))}
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      width={"20px"}
                      style={{ padding: 0, width: 10 }}
                    >
                      <Modal type='View'>
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </Modal>
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      width={"20px"}
                      style={{ padding: 0, width: 10 }}
                    >
                      <Modal type='Edit'>
                        <IconButton>
                          <Edit />
                        </IconButton>
                      </Modal>
                    </StyledTableCell>
                    <StyledTableCell
                      align='right'
                      width={"20px"}
                      style={{ padding: 0, width: 10 }}
                    >
                      <Modal type='Delete'>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </Modal>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
