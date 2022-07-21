import React, {useEffect} from 'react'
import axios from 'axios'

// LandingPage에 들어오자마자 밑의 useEffect를 실행한다.
function LandingPage() {

    /*
        CORS 정책이 있는 이유는 다른 웹사이트에서 우리 서버에 뭘 보낼때 보안적인 이슈가 생기기 때문이다. cross origin resource sharing 
        5000번 포트와 3000번 포트는 각각 오리진이 있고 오리진이 다르다. 
        https://create-react-app.dev/docs/proxying-api-requests-in-development/
        CORS 오류를 해결하기 위해선 proxy 방법을 이용하자(위 링크)
        서버 포트는 5000번이므로 client 포트도 5000번으로 설정해줘야함.
    */
    useEffect(() => {
        // getRequset를 서버에 보내고, 그것의 end point는 api/hello고
        // 보낸 다음에 서버에서 돌아오는 response를 console창에 보여줄 수 있도록 해준 것임.
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => { console.log(response.data) })
    }

    return (
        <div>
            LandingPage
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage