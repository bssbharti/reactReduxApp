import {combineReducers, createStore,applyMiddleware} from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
const initialState ={
     fetching : false,
     fetched : false,
     users : [],
     error : null
}
const reducer = (state=initialState, action) => {
     switch (action.type) {
          case "Fetch_User_Start":{
               return Object.assign({},state,{fetching:true})
               //return { ...state,fetching:true}
               break;
          }
          case "Fetch_User_Error":{
             return Object.assign({},state,{fetching:false, error: action.payload})
               //return { ...state,fetching:false, error: action.payload}
               break;
          }
          case "Receive_User":{
               return Object.assign({},state,{fetching:false,fatched:true,users:action.payload})
               //return { ...state,
                    // fetching:false,
                    //fetched:true,
                    // users:action.payload}
               break;
          }
     }
      return state;
}
const middleware = applyMiddleware(thunk,logger());
const store = createStore(reducer,middleware);
// store.subscribe(()=>{
//      console.log("store is changed",store.getState());
// })
store.dispatch({
    type:"foo",
    payload: axios.get("http://rest.learncode.academy/api/wstern/users")
})
store.dispatch((dispatch)=>{
     dispatch({type:"Fetch_User_Start"})
      axios.get("http://rest.learncode.academy/api/wstern/users")
      .then((response)=>{
           dispatch({type:"Receive_User",payload:response.data})
      }).catch((err)=>{
            dispatch({type:"Fetch_User_Error",payload:err})
      })
     //do something async
});

/********Use multiple reducers ********/
// const userReducer = (state={}, action)=>{
//      switch (action.type) {
//           case "CHANGE_USER":{
//                //state = (...state, name: action.payload)
//                state.name = action.payload;
//                break;
//           }case "CHANGE_AGE":{
//                //state =  (...state, age: action.payload )
//                state.age = action.payload;
//                break;
//           }
//      }
//   return  state;
// }
// const tweeReducer = (state=[], action)=>{
//   return  state;
// }
// const reducers = combineReducers({
//      user : userReducer,
//      tweets : tweeReducer
// })
//
// const store = createStore(reducers);
// store.subscribe(() => {
//      console.log("store changed",store.getState());
// })
//
// store.dispatch({type: "CHANGE_USER",payload:"vishseh"})
// store.dispatch({type: "CHANGE_AGE",payload:4345})

/********* end Multiple reducers ******/
/********Create middleware ********/
// const looger = (store) => (next) => (action)=>{
//      console.log("action fired", action);
//      next(action);
// }
// const error = (store) => (next) => (action)=>{
//      console.log("action fired", action);
//      next(action);
// }
// const middleware = applyMiddleware(looger,error);
