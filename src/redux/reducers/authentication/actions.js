import { 
  SET_AUTHENTICATION_TOKEN,
  SET_IS_AUTHENTICATED
 } from "../../actionTypes";

export const setAuthentiationToken = (token) => ({
  type: SET_AUTHENTICATION_TOKEN,
  payload: { token }
});


export const setIsAuthenticated = (isAuthenticated) => ({
  type: SET_IS_AUTHENTICATED,
  payload: { isAuthenticated }
});
  