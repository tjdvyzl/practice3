const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 여기서 trim이란? 이메일을 예로 들자면 tjd vy@naver.com에서 띄어쓰기가 존재할 경우 이를 없애준다.
        unique:1 // 똑같은 이메일을 쓸 수 없도록 설정
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 5
    },
    /*
        role을 주는 이유는 어떤 유저가 관리자가 될 수도있고 일반 유저가 될 수도있다.
        그리고 관리자는 일반 유저를 관리할 수 있다. 
    */
    role: { 
        type:Number, // Number가 1이면 관리자고 0이면 일반유저고 이런식으로 지정 가능
        default:0 // role로 0을 주겠다.
    },
    image: String,
    token: { // token을 이용해서 나중에 유효성같은거를 관리할 수 있다.
        type:String
    },
    tokenExp: { // token 유효기간 즉, 토큰을 사용할 수 있는 기간을 주는것이다.
        type:Number
    }
})

// model은 schema를 감싸준다. userSchema를 감싸줄 모델 이름, 스케마
const User = mongoose.model("User", userSchema);

// 마지막으로 위 모델을 다른 파일에서도 쓸 수 있도록 export 해준다.
module.exports = {User}