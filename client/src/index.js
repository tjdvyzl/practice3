import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';


// https://ant.design/
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { applyMiddleware } from 'redux';

// 리덕스 store은 객체 형식만 받을 수 있는데
// promise 형태나 function 형태로 올 때
// 미들웨어가 이를 받을 수 있도록 도와줄 수 있다.
// 그 미들웨어를 설정하는 작업
// 원래면 createStore을 해서 store을 리덕스에서 생성하는 건데,
// 그냥 store는 객체밖에 못받기 때문에 두 형식을 받을 수 있도록
// 이 미들 웨어와 함께 만들어준다고 생각하자.
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Provider을 import해와서 여기다가 감싸주면 리덕스와 어플리케이션과 연결시킬 수 있음
  <Provider
    store={createStoreWithMiddleware(Reducer
      // ,window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //               window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
