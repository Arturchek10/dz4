import { createEvent, createStore } from "effector";

export const $isLogin = createStore<boolean>(false)
export const setIsLogin = createEvent<boolean>()

$isLogin.on(setIsLogin, (_, newVal) => newVal)