import { useContext, useEffect, useState } from "react";
import {
  Checkbox,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import axios from "axios";

import Modal from "../../components/Modal";
import userContext from "../../context/userContext";

function createData(index, name) {
  return { index, name };
}

const rows = [
  createData(1, "Personal"),
  createData(2, "Corporate"),
  createData(3, "Private"),
  createData(4, "Corporate"),
  createData(5, "Corporate"),
  createData(6, "Personal"),
  createData(7, "Private"),
  createData(8, "Personal"),
];

const headCells = [
  {
    id: "index",
    numeric: true,
    disablePadding: false,
    label: "S.No",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "view",
  },
  {
    id: "edit",
  },
  {
    id: "delete",
  },
];

function EnhancedTableHead({
  onSelectAllClick,
  numSelected,
  rowCount,
  headCells,
}) {
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

export default function EventCategory() {
  const [selected, setSelected] = useState([]);
  const [text, setText] = useState([]);
  const { userData } = useContext(userContext);

  const classes = useStyles();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
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

  const isSelected = (index) => selected.indexOf(index) !== -1;

  const getEventCategory = () => {
    console.log(userData.token);
    axios
      .get("http://65.0.101.96:3001/admin/event-categories", {
        headers: {
          Authorization: userData.token,
          language: "en",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log('data error')
      })
      .catch((error) => {
        console.log(error);
        console.log('data not error')
      });
  };

  useEffect(() => {
    getEventCategory();
  });

  return (
    <Table className={classes.table} size='small'>
      <EnhancedTableHead
        classes={classes}
        numSelected={selected.length}
        onSelectAllClick={handleSelectAllClick}
        rowCount={rows.length}
        headCells={headCells}
      />
      <TableBody>
        {rows.map((row, index) => {
          const isItemSelected = isSelected(row.index);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <StyledTableRow
              hover
              role='checkbox'
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={index}
              selected={isItemSelected}
            >
              <StyledTableCell padding='checkbox'>
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ "aria-labelledby": labelId }}
                  onClick={() => handleClick(row.index)}
                />
              </StyledTableCell>
              <StyledTableCell align='left' width={80}>
                {row.index}
              </StyledTableCell>
              <StyledTableCell align='left'>{row.name}</StyledTableCell>
              <StyledTableCell
                align='right'
                width={"20px"}
                style={{ padding: 0, width: 10 }}
              >
                <Modal type='View' text={text} setText={setText}>
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
                <Modal type='Edit' text={text} setText={setText}>
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
                <Modal type='Delete' text={text} setText={setText}>
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
  );
}

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 500,
  },
}));

const StyledTableCell = withStyles(() => ({
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
