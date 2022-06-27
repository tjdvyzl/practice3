const express = require('express');
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://tjdvyzl:34%21%40wjstjdvy@toyproject.2gmwb4f.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello World') });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

/*
    model이란?
        스케마를 감싸주는 역할
    schema란?
        어떤 상품에 관련된 글을 작성할 때, 글을 작성한 사람이 누구인지 써야되고 작성을 할 때 포스트의 이름이 무엇인지
        타입은 무엇인지, 최고 길이로 얼마나 지정할 것인지 이런것들을 스케마를 통해 지정할 수 있는것이다.
        즉, 하나하나에 정보를 지정해줄 수 있는 것
*/