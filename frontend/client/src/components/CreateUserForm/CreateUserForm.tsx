import styles from "./CreateUserForm.module.css";
import { TextField, Button } from "@mui/material";
import JobStatusInput from "../../elements/JobStatusInput";
import PhoneNumber from "../../elements/PhoneElement/PhoneNumber";
import { useState,  } from "react";
import type {ChangeEvent} from "react"
import { useUnit } from "effector-react";
import { createUserFx } from "../../store/usersStore";
import { useNavigate } from "react-router-dom";

export default function CreateUserForm() {
  const createUser = useUnit(createUserFx);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [employment, setEmployment] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPass = password.length >= 5;

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.replace(/[^a-zA-Zа-яА-Я ]/g, ""));
  };
  const handleSurname = (e: ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value.replace(/[^a-zA-Zа-яА-Я ]/g, ""));
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleTelephoneChange = (value: string) => setTelephone(value);
  const handleEmploymentChange = (value: string) => setEmployment(value);

  const resetForm = () => {
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setEmployment("");
  };
  const navigate = useNavigate()
  const handleSubmit = async () => {
    if (!name || !surname || !isValidEmail || !isValidPass || !telephone || !employment) {
      alert("Пожалуйста, заполните все поля корректно");
      return;
    }

    try {
      await createUser({
        id: undefined,
        name,
        surName: surname,
        fullName: `${name} ${surname}`,
        email,
        password,
        telephone,
        employment,
        userAgreement: true,
      });

      alert("Пользователь успешно создан");
      navigate("/")
      resetForm();
    } catch (error: any) {
      console.error("Ошибка при создании пользователя:", error);
      alert("Не удалось создать пользователя. Попробуйте снова.");
    }
  };

  return (
    <div className={styles["create-user-form"]}>
      <h1>Создание пользователя</h1>

      <div className={styles["name-surname"]}>
        <TextField label="Имя" variant="standard" fullWidth onChange={handleName} value={name} />
        <TextField label="Фамилия" variant="standard" fullWidth onChange={handleSurname} value={surname} />
      </div>

      <div className={styles["email-birthdate"]}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          onChange={handleEmail}
          value={email}
          error={!!email && !isValidEmail}
          helperText={!!email && !isValidEmail ? "Некорректный email" : ""}
          sx={{
            "& .MuiInput-input": {
              color: isValidEmail || !email ? "#000" : "#EF233C",
            },
          }}
        />
        <TextField
          label="Пароль"
          placeholder="введите пароль"
          variant="standard"
          fullWidth
          onChange={handlePassword}
          value={password}
          error={!!password && !isValidPass}
          helperText={!!password && !isValidPass ? "Минимум 5 символов" : ""}
        />
      </div>

      <div className={styles["job-phone"]}>
        <PhoneNumber value={telephone} onChange={handleTelephoneChange} />
        <JobStatusInput value={employment} onChange={handleEmploymentChange} />
      </div>

      <div className={styles["btn-div"]}>
        <Button size="large" fullWidth color="error" onClick={() => window.history.back()}>
          Отмена
        </Button>
        <Button
          size="large"
          fullWidth
          color="primary"
          disabled={!name || !surname || !isValidEmail || !isValidPass || !telephone || !employment}
          onClick={handleSubmit}
        >
          Создать
        </Button>
      </div>
    </div>
  );
}
