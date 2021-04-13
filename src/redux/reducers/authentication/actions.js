import { SET_AUTHENTICATION_TOKEN } from "../../actionTypes";

export const setAuthentiationToken = (token) => ({
  type: SET_AUTHENTICATION_TOKEN,
  payload: { token }
});
  