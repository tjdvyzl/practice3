const { User } = require('../models/User');

let auth = (req, res, next) => {
    
    // 인증처리들을 여기서 처리한다.

    // 클라이언트에서 토큰을 갖고온다. cookieParser 이용
    let token = req.cookies.x_auth;

    // 토큰을 복호화 한 후에 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ isAuth: false, error: true })
        
        req.token = token; 
        req.user = user;
        // token과 user를 req에 넣어줌으로써 
        // index 파일에서 req.user 하면은 user 정보를 가질 수 있고
        // req.token을 하면 token 정보를 가질 수 있다.
        next(); // next가 없으면 auth 미들웨어에서 갇혀버리
    })

    // 유저가 있으면 인증 ok

    // 유저가 없으면 인증 no
}

module.exports = { auth };