import ReducerActionType from '../../ReducerActionType'; 

const authenticationReducer = (state = {
  isAuthenticated: false
}, action : ReducerActionType) => {
  switch (action.type) {
    case 'SET_AUTHENTICATION_TOKEN':
      return {
        ...state,
        token: action.payload.token
      };
    case 'SET_IS_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated
      };
    default:
      return state;
  }
}
  
export default authenticationReducer;
  