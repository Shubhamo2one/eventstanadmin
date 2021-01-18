import { useState } from "react";
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
import Modal from "../../components/Modal";

function createData(
  index,
  name,
  category,
  primary_services,
  add_ons,
  link_filters
) {
  return { index, name, category, primary_services, add_ons, link_filters };
}

const rows = [
  createData(1, "Personal", "abcd", "abcd", "abcd", "abcd"),
  createData(2, "Corporate", "abcd", "abcd", "abcd", "abcd"),
  createData(3, "Private", "abcd", "abcd", "abcd", "abcd"),
  createData(4, "Corporate", "abcd", "abcd", "abcd", "abcd"),
  createData(5, "Corporate", "abcd", "abcd", "abcd", "abcd"),
  createData(6, "Personal", "abcd", "abcd", "abcd", "abcd"),
  createData(7, "Private", "abcd", "abcd", "abcd", "abcd"),
  createData(8, "Personal", "abcd", "abcd", "abcd", "abcd"),
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
    id: "Category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "Primary Services",
    numeric: false,
    disablePadding: false,
    label: "Primary Services",
  },
  {
    id: "Add-Ons",
    numeric: false,
    disablePadding: false,
    label: "Add-Ons",
  },
  {
    id: "Link Filters",
    numeric: false,
    disablePadding: false,
    label: "Link Filters",
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

export default function Events() {
  const classes = useStyles();
  const [selected, setSelected] = useState([]);

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
              <StyledTableCell align='left'>{row.category}</StyledTableCell>
              <StyledTableCell align='left'>
                {row.primary_services}
              </StyledTableCell>
              <StyledTableCell align='left'>{row.add_ons}</StyledTableCell>
              <StyledTableCell align='left'>{row.link_filters}</StyledTableCell>
              <StyledTableCell
                align='right'
                width={"20px"}
                style={{ padding: 0, width: 10 }}
              >
                <Modal type='View' textContent={row.name}>
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
                <Modal type='Edit' textContent={row.name}>
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
                <Modal type='Delete' textContent={row.name}>
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
