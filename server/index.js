const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { User } = require("./models/User");
const { auth } = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const config = require('../config/key');

// application/x-www-form-urlencoded로 된 데이터를 분석해서 가지고 올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json로 된 데이터를 분석해서 가지고 올 수 있게 해준다.
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello World!@#!@#') });

app.get('/api/hello', (req, res) => {
    res.send("hi!");
})

/*
    회원 가입할 때 필요한 정보들을 client에서 가져오면 
    그것들을 데이터 베이스에 넣어준다.
*/
app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
        // 저장을 할 때 에러가 있다면 클라이언트에다가 전달을 해주어야하는데 전달할 때 제이슨 형태로 전달해주고 에러 메세지도 보내준다.
        if (err)
            return res.json({ success: false, err })
        // status(200)은 성공했다는 의미
        else 
            return res.status(200).json({success:true})
    }); // mongoDB에서 오는 메소드이다. 정보들이 유저 모델에 저장이 된다.
})

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당되는 유저가 없습니다."
            })
        }
        else {
            // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인

            // comparePassword라는 메소드를 따로 만들자.
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
                else {
                    // 비밀번호까지 맞다면 토큰을 생성하기.
                    user.generateToken((err, user) => {
                        if (err) return res.status(400).send(err);
                        else {
                            // 토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지, 등등 여러가지가 있고 각기 장단점이 있음. 이 강의에선 쿠키로 함
                            res.cookie("x_auth", user.token) // x_auth라는 이름의 쿠키가 생성될것이
                                .status(200)
                                .json({ loginSuccess: true, userId: user._id })
                        }
                    })
                }
            })
        }
    })
    
})


// 중간에 auth는 미들웨어인데 미들웨어란?
// 밑에 /auth의 엔드포인트에서 리퀘스트를 받은다음
// 콜백함수를 중단시켜서 뭘 해주는 역할
app.get('/api/users/auth', auth, (req, res) => {
    
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true 라는 말.
    res.status(200).json({
        _id: req.user._id, // 이렇게 할 수 있는 이유는 auth파일에서 
        // user를 req에 넣었기 때문임.
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email:req.user.email,
        name: req.user.name,
        lastname:req.user.lastname,
        role: req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    // 로그아웃 하려는 유저를 DB에서 찾아서 토큰을 없애준다.

    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success:true
            })
    })
})

const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
    model이란?
        스케마를 감싸주는 역할
    schema란?
        어떤 상품에 관련된 글을 작성할 때, 글을 작성한 사람이 누구인지 써야되고 작성을 할 때 포스트의 이름이 무엇인지
        타입은 무엇인지, 최고 길이로 얼마나 지정할 것인지 이런것들을 스케마를 통해 지정할 수 있는것이다.
        즉, 하나하나에 정보를 지정해줄 수 있는 것
*/