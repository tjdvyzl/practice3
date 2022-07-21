import {
    LOGIN_USER
} from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER: 
            return { ...state, loginSuccess:action.payload} 
        // ...은 spread operator라고 하는데
        // 그냥 state를 똑같이 갖고오는 것이
            break;
        default:
            return state;
    }
}