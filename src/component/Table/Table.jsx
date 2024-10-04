import UserContext from "@/context/UserContext";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table as MuiTable,
  Paper,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/joy";

const TablePage = ({ handleEdit, handleDelete }) => {
  const { tableData } = useContext(UserContext);  // get formData form contextApi
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const data = tableData ? JSON.parse(tableData) : [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        className="shadow-lg rounded-lg border-2 border-sky-500"
      >
        <MuiTable
          sx={{
            maxHeight: 440,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          className=" max-w-2xl"
          stickyHeader
        >
          <TableHead className="bg-red-500">
            <TableRow>
              <TableCell className="font-bold"> Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Contact Number</TableCell>
              <TableCell className="font-bold">Password</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 ? (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                <TableRow key={item.id || index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.number}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>
                    <Button
                      className="bg-red-500 hover:bg-red-600 delete-icon"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button
                      className="bg-blue-500 ms-8 hover:bg-blue-600"
                      onClick={() => handleEdit(index)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No user data is available</TableCell>
              </TableRow>
            )}
          </TableBody>

        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-gray-100"
        />
      </Paper>
    </>
  );
};
export default TablePage;
