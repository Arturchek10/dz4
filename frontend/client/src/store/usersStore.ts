import {createEffect, createEvent, createStore, sample} from "effector"
import * as usersApi from "../api/users"
import { logout } from "./authStore";
export const createUserFx = createEffect(usersApi.createUser)
export const userCreated = createEvent();
export const getAllUsersFx = createEffect(usersApi.getAllUsers);
export const $users = createStore<usersApi.User[]>([])
  .on(getAllUsersFx.doneData, (_, users) => users)
  .reset(logout);
sample({
  clock: createUserFx.done, 
  target: getAllUsersFx,  
});

