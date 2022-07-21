const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10
const jwt = require('jsonwebtoken');

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
        type: String
        //minlength: 5
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


// https://www.npmjs.com/package/bcrypt
// 유저 정보를 저장하기 전에 무엇을 한다는 것이
userSchema.pre('save', function (next) {
    // 안의 함수가 끝나면 next함수를 통해 index.js 파일의 내용 중
    // user.save 코드로 보내는 것임

    // 비밀번호를 암호화 시킨다.

    var user = this;

    // 아이디나 이메일 같은 것들을 바꿀 때도 밑의 코드가 실행되지 않도록
    // pw만 변경되었을때 밑의 코드를 실행시킬 수 잇도록 조건문
    if (user.isModified('password')) {

        // salt를 만들 때 saltRounds가 필요하다.
        // 그래서 밑에처럼 먼저 saltRounds를 먼저 넣고, 
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next();
            });
        });
    } else { // 변경된게 pw가 아니라 다른거라면 next함수를 호출시켜 user.save 코드로 보내준다.
        next()
    }
})

userSchema.methods.comparePassword = (plainPassword, cb) => {
    // plainPassword 1234567    암호화된 비밀번호 !@#$
    // 위 plainpw를 암호화해서 비교를 해야함.
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err),
        cb(null, isMatch) // 만약 비밀번호가 같다면 err는 없고 isMatch는 true일 것임.
    })
}

// https://www.npmjs.com/package/jsonwebtoken 

userSchema.methods.generateToken = function (cb) {
    
    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id 와 secretToken이라는 문자열이 합쳐져서 토큰을 만드는 것이다.
    // user._id 와 문자열을 합쳐서 만든것이므로 문자열을 넣었을 때 user._id를 얻을 수 있다.

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function (err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에 
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        }) // mongoDB에 있는 메소
    })
}

// model은 schema를 감싸준다. userSchema를 감싸줄 모델 이름, 스케마
const User = mongoose.model("User", userSchema);

// 마지막으로 위 모델을 다른 파일에서도 쓸 수 있도록 export 해준다.
module.exports = {User}