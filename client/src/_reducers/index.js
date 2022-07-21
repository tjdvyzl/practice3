import { combineReducers } from "redux";
import user from './user_reducer';


const rootReducer = combineReducers({
    user
})

export default rootReducer;

// Reducer가 여러개 있을 수 있는 이유는
// reducer안에서 하는 일이 어떻게 state가 변화하는것을
// 보여준 다음에 변화하는 마지막 값을 리턴해주는 역할임.

// state이 user에 관한 state이 있을 수 있고,
// subscribe에 관한 state가 있을 수 있기 때문인데.
// combineReducers을 이용해서 root reducer에서 하나로 합쳐주는 것임
