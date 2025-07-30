import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./UserTable.module.css";
import { $users, getAllUsersFx } from "../../store/usersStore";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
  const allUsers = useUnit($users);
  const loadUsers = useUnit(getAllUsersFx);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const navigate = useNavigate()


  return (
    <div className={styles["usertable-main"]}>
      <TableContainer
        component={Paper}
        sx={{ height: "fit-content", background: "#f2ececb3" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell>ID</TableCell>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Job status</TableCell>
              <TableCell align="center">number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => navigate(`/edit/${user.id}`)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.employment}</TableCell>
                <TableCell align="center">{user.telephone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
