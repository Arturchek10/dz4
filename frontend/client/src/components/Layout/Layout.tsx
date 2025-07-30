import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import styles from "./Layout.module.css"

export default function Layout(){
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles["main-app"]}>
        <SideBar />
        <div className={styles["content"]}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}