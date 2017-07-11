export default function reducer(state={
    users:[],
    fetching: false,
    fetched: false,
    error: null,
    user : '',
    tempName : ''
  }, action) {

  switch (action.type) {
      case "FETCH_USERS": {
        return {...state, fetching: true}
        break;
      }
      case "FETCH_USERS_REJECTED": {
        return {...state, fetching: false, error: action.payload}
          break;
      }
      case "FETCH_USERS_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          users: action.payload,
        }
          break;
      }
      case "UPDATE_TEMPNAME" :
          return {
               ...state,
               tempName: action.payload
          }
      case "DELETE_USER":{
           const { data } = state.users;
           const { id } = action.payload.data;
           return{
                ...state,
                users: data.filter( (user) => user._id !== id )
           }
      }
      case "GET_USER_DETAIL":{
           return {
                  ...state,
                  user : action.payload,
                  tempName : action.payload.data.name
           }
      }
      case "UPADTE_USER":{
          return {
                 ...state,
                 user : action.payload
          }
     }
     case "UPDATE_USER_ERROR":{
         return {
                ...state,
                error : action.payload
         }
    }
    }
    return state
}
