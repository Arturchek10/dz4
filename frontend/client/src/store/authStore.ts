import {createEffect, createEvent, createStore, sample} from "effector"

export const redirectAfterLogin = createEvent();

import * as authApi from "../api/auth"

// событие выхода
export const logout = createEvent()

// эффект входа
export const loginFx = createEffect(authApi.login)

// эффект получения получение текущего пользователя
export const getMeFx = createEffect(authApi.getMe)


// хранилище текущего пользователя
export const $user = createStore<authApi.User | null  >(null)
.on(loginFx.doneData, (state) => state)
.on(getMeFx.doneData, (_, user) => user)
.reset(logout)

// Статусы
export const $isLogin = $user.map((u) => u !== null);
export const $isAdmin = $user.map((u) => u?.role === "admin");

export const $isAuthenticated = createStore(false)
.on(loginFx.done, () => true)   // когда логин успешен => true
.reset(logout);                 // при выходе false

sample({
  clock: loginFx.done,
  target: redirectAfterLogin,
});

// вызывать текущие данные о пользователе после логина
sample({
  clock: loginFx.doneData,
  target: getMeFx,
})