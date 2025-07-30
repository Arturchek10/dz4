// запросы для входа/выхода/получения текущего пользователя  

import {api} from "./api"

export type LoginPayload = {
  email: string,
  password: string,
}

export type User = {
    id: string,
    name: string,
    surName: string,
    fullName: string,
    email: string,
    password: string,
    telephone: string,
    employment: string,
    userAgreement: true,
}


// LogIN
export const login = async (payload: LoginPayload): Promise<any> => {
  const response = await api.post<{ message: string }>("/auth/login", payload)
  console.log(response);
  return response
}

// LogOUT
export const logout = async () : Promise<void> => {
  await api.post("/auth/logout")
}

// получение текущего пользователя
export const getMe = async () : Promise<User> => {
  const response = await api.get<User>("/auth/me")
  return response.data
}

