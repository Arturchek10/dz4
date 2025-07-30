import styles from "./Header.module.css";
import Button from "@mui/material/Button";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";
import { $isAuthenticated, logout } from "../../store/authStore";

export default function Header() {
  const isAuth = useUnit($isAuthenticated);
  const logoutFn = useUnit(logout);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/user/login");
  };

  const handleLogout = () => {
    logoutFn();
    console.log("выход");
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {isAuth ? (
          <div className={styles["header-div"]}>
          <p>Admin</p>
          <Button variant="outlined" onClick={handleLogout}>
            Выйти
          </Button>
          </div>
        ) : (
          <Button variant="outlined" onClick={handleLogin}>
            Войти
          </Button>
        )}
      </div>
    </header>
  );
}
