import ReducerActionType from '../../ReducerActionType'; 

const authenticationReducer = (state = [], action : ReducerActionType) => {
  switch (action.type) {
    case 'SET_AUTHENTICATION_TOKEN':
      return {
        ...state,
        token: action.payload.token
      };
    default:
      return state;
  }
}
  
export default authenticationReducer;
  