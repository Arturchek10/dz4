import styles from "./SideBar.module.css";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>
        <h2>Навигация</h2>
      </div>
      <div className={styles.list}>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles["active"] : "")}
              >
                Все пользователи
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Создать пользователя
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/user/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
