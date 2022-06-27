const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const { User } = require("./models/User");

// application/x-www-form-urlencoded로 된 데이터를 분석해서 가지고 올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json로 된 데이터를 분석해서 가지고 올 수 있게 해준다.
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tjdvyzl:34%21%40wjstjdvy@toyproject.2gmwb4f.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello World') });


/*
    회원 가입할 때 필요한 정보들을 client에서 가져오면 
    그것들을 데이터 베이스에 넣어준다.
*/
app.post('/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, userInfo) => {
        // 저장을 할 때 에러가 있다면 클라이언트에다가 전달을 해주어야하는데 전달할 때 제이슨 형태로 전달해주고 에러 메세지도 보내준다.
        if (err) return res.json({ success: false, err })
        // status(200)은 성공했다는 의미
        return res.status(200).json({success:true})
    }); // mongoDB에서 오는 메소드이다. 정보들이 유저 모델에 저장이 된다.
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
    model이란?
        스케마를 감싸주는 역할
    schema란?
        어떤 상품에 관련된 글을 작성할 때, 글을 작성한 사람이 누구인지 써야되고 작성을 할 때 포스트의 이름이 무엇인지
        타입은 무엇인지, 최고 길이로 얼마나 지정할 것인지 이런것들을 스케마를 통해 지정할 수 있는것이다.
        즉, 하나하나에 정보를 지정해줄 수 있는 것
*/