// NODE_ENV는 환경변수 인데 
// 우리가 development 모드에 있을 때는 
// process.env.NODE_ENV가 development로 나올 것이고
// deploy한 이후라면 production 모드로 나올 것이다.
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev')
}
