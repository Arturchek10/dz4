import styles from "./RedactForm.module.css";
import { TextField, Button } from "@mui/material";
// import JobStatusInput from "../../elements/JobStatusInput";
// import PhoneNumber from "../../elements/PhoneElement/PhoneNumber";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../api/users";
import type { User } from "../../api/users";

export default function EditUserForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Валидации
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData?.email || "");
  const isValidPass = (userData?.password?.length || 0) >= 5;

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((data) => {
          setUserData(data);
        })
        .catch(() => {
          alert("Не удалось загрузить пользователя");
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleChange =
    (key: keyof User) => (e: ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => prev && { ...prev, [key]: e.target.value });
    };

  // const handleTelephoneChange = (value: string) => {
  //   setUserData((prev) => prev && { ...prev, telephone: value });
  // };

  // const handleEmploymentChange = (value: string) => {
  //   setUserData((prev) => prev && { ...prev, employment: value });
  // };

  const handleSubmit = async () => {
    if (
      !userData?.name ||
      !userData?.surName
      // !isValidEmail ||
      // !userData?.telephone ||
      // !userData?.employment
    ) {
      alert("Пожалуйста, заполните все поля корректно");
      return;
    }

    try {

      await updateUser(userData.id!, {
        name: userData.name,
        surName: userData.surName,
        fullName: `${userData.name} ${userData.surName}`,
        // email: userData.email,
        // telephone: userData.telephone,
        // employment: userData.employment,
      });
      alert("Пользователь успешно обновлён");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении пользователя");
    }
  };

  if (isLoading || !userData) return <div>Загрузка...</div>;

  return (
    <div className={styles["create-user-form"]}>
      <h1>Редактирование пользователя</h1>

      <div className={styles["name-surname"]}>
        <TextField
          label="Имя"
          variant="standard"
          fullWidth
          onChange={handleChange("name")}
          value={userData.name}
        />
        <TextField
          label="Фамилия"
          variant="standard"
          fullWidth
          onChange={handleChange("surName")}
          value={userData.surName}
        />
      </div>

      <div className={styles["email-birthdate"]}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          disabled
          value={userData.email}
          error={!!userData.email && !isValidEmail}
          helperText={
            !!userData.email && !isValidEmail ? "Некорректный email" : ""
          }
        />
        <TextField
          label="Пароль"
          variant="standard"
          fullWidth
          disabled
          helperText="Пароль нельзя изменить"
          value={userData.password}
          error={!!userData.password && !isValidPass}
        />
      </div>

      <div className={styles["job-phone"]}>
        {/* <PhoneNumber
          value={userData.telephone}
          onChange={handleTelephoneChange}
        />
        <JobStatusInput
          value={userData.employment}
          onChange={handleEmploymentChange}
        /> */}
      </div>

      <div className={styles["btn-div"]}>
        <Button
          size="large"
          fullWidth
          color="error"
          onClick={() => navigate("/")}
        >
          Назад
        </Button>
        <Button
          size="large"
          fullWidth
          color="primary"
          disabled={
            !userData.name ||
            !userData.surName
          }
          onClick={handleSubmit}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
}
