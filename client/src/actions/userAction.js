import axios from "axios";
export function fetchUser() {
     return function(dispatch) {
          axios.get("api/user/list")
          .then((response) => {
               dispatch({type: "FETCH_USERS_FULFILLED", payload: response.data})
          })
          .catch((err) => {
               dispatch({type: "FETCH_USERS_REJECTED", payload: err})
          })
     }
}

export function deleteUser(id) {
     return function(dispatch) {
          axios.get("/api/user/delete",{
               params: {
                    id: id
               }
          })
          .then((response) => {
               dispatch({type: "DELETE_USER", payload: response.data})
          })
          .catch((err) => {
               dispatch({type: "DELETE_USER_ERROR", payload: err})
          })
     }
     // return { type: 'DELETE_USER', payload: id}
}
export function getUser(id) {
     return function(dispatch) {
          axios.get("/api/user/profile",{
               params: {
                    id: id
               }
          })
          .then((response) => {
               dispatch({type: "GET_USER_DETAIL", payload: response.data})
          })
          .catch((err) => {
               dispatch({type: "GET_USER_ERROR", payload: err})
          })
     }
     // return { type: 'DELETE_USER', payload: id}
}

/****** multiple image upload ********/
function uploadImage(imageObj){
     return  axios.post("/api/user/update",imageObj)
            .then((response) => {
                 return response.data;
            })
            .catch((err) => {
                return err;
            })
     }
/************* end **************/
 export function updateProfile(obj) {
     //console.log(obj);
return function(dispatch) {
     let imageFormData = null;
     var files = obj.image;
     for (var key in files) {
           imageFormData = new FormData();
          imageFormData.append('id',obj.id);
          imageFormData.append('name',obj.name);
       // is the item a File?
         if (files.hasOwnProperty(key) && files[key] instanceof File) {
             imageFormData.append('imageFile', files[key]);
               uploadImage(imageFormData).then((response) => {
                dispatch({type: "UPADTE_USER", payload: response.data})
             })
             .catch((err) => {
                  dispatch({type: "UPDATE_USER_ERROR", payload: err})
             });
         }
    }
   }
}

export function updateTempName(name){
     return function(dispatch){
          dispatch({type: "UPDATE_TEMPNAME", payload: name});
     }
}
