import './App.css';

import { Route, Router, Routes } from 'react-router-dom';
import { Home, ReadMessages, SignUp } from './Pages';
import { Login } from './Pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Messages } from './Pages/Messages';
import { useDispatch } from 'react-redux';
import { setUserData } from './redux/Slice/UserSlice';
import dotenv from 'dotenv';

function App() {
  //localStorage.clear();
  const dispatch = useDispatch();
  const id = localStorage.getItem('userId');
  const name = localStorage.getItem('username');
  const token = localStorage.getItem('userToken');
  const { user } = useSelector((store: any) => store);
  const obj = { userId: id, username: name, token: token };

  dispatch(setUserData(obj));

  const checkLogin = () => {
    return id ? <Home /> : <Login />;
  };
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={checkLogin()}></Route>
        <Route path='/:id' element={<Messages />}></Route>
        <Route path='/:id/:messageId' element={<ReadMessages />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
