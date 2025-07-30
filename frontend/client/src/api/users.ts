// запросы для работы с пользователями

import { api } from "./api";

export type User = {
  id: string | undefined,
  name: string,
  surName: string,
  fullName: string,
  email: string,
  password: string,
  telephone: string,
  employment: string,
  userAgreement: true,
};

type CreateUserPayload = {
  name: string,
  id: string,
};

// получение всех пользователей (только для админа)
export const getAllUsers = async () : Promise<User[]> => {
  const response = await api.get("/users")
  return response.data
} 

// Получить пользователя по ID
export const getUserById = async (id: string) : Promise<User> => {
  const response = await api.get(`/users/${id}`)
  return response.data
}

// Создать пользователя (только для админа)
export const createUser = async (Payload: User) :Promise<CreateUserPayload> => {
  const response = await api.post("/users", Payload)
  return response.data
} 

// отредактировать пользователя
export const updateUser = async (id: string, Payload: Partial<User>) : Promise<string>=> {
  const response = await api.patch(`/users/${id}`, Payload)
  return response.statusText
}

// удалить пользователя 
export const deleteUser = async (id: string) : Promise<string> => {
  const response = await api.delete(`/users${id}`)
  return response.statusText
}