import { fetchChatrooms } from "./ChatActions";
import { FIREBASE } from "./../data/keys";


export const SAVE_USER = 'SAVE_USER';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';


export const saveUser = (user) => {
    return {type: SAVE_USER, payload: user};
};
 


export const signup = (email, password) => {
   return async dispatch => {
       console.log("signup");
       const response = await fetch(
           'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ FIREBASE, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({ //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email: email,
               password: password,
               returnSecureToken: true
           })
       });
 
       const data = await response.json(); // json to javascript
       console.log(data);
       if (!response.ok) {
           //There was a problem..
       } else {
           
           dispatch({type: SIGNUP, payload: data });
           dispatch(fetchChatrooms());
           
       }
   };
};

export const signin = (email, password) => {
    return async dispatch => {
        console.log("signin");
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+FIREBASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
  
        const data = await response.json(); // json to javascript
        console.log(data);
        if (!response.ok) {
            //There was a problem..
        } else {
            
            dispatch({type: SIGNIN, payload: data });
            dispatch(fetchChatrooms());
            
        }
    };
 };

