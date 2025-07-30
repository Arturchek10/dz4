import styles from "./LoginForm.module.css";
import { TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUnit } from "effector-react";
import { loginFx, redirectAfterLogin } from "../../store/authStore";

import type { ChangeEvent } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPass, setIsValidPass] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const login = useUnit(loginFx);
  const navigate = useNavigate();

  // один раз подписываемся на redirectAfterLogin
  useEffect(() => {
    const unsub = redirectAfterLogin.watch(() => {
      navigate("/");
    });

    return () => unsub(); // отписка при размонтировании
  }, [navigate]);

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setIsValidPass(value.length >= 5);
  };

  const handleCheck = () => setIsChecked((prev) => !prev);

  const handleSubmit = () => {
    if (isValidEmail && isValidPass && isChecked) {
      login({ email, password });
    }
  };

  return (
    <div className={styles["create-user-form"]}>
      <h1>Авторизация</h1>
      <div style={{ width: "50%", paddingBottom: "20px" }}>
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

      <div
        style={{ width: "50%", display: "flex", justifyContent: "flex-start" }}
      >
        <FormControlLabel
          control={<Checkbox checked={isChecked} onClick={handleCheck} />}
          label="Я согласен с условиями использования"
        />
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          marginTop: "5%",
        }}
      >
        <Button variant="contained" color="error">
          Отмена
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!isChecked || !isValidEmail || !isValidPass}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
