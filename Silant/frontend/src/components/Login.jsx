import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../authReducer';

import MyInput from '../UI/Input/MyInput';
import MyButton from "../UI/Button/MyButton"

import "../styles/Login.css"

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.authToken;
    
      dispatch(login(token));
      console.log('Успешная авторизация!');
    } else {
      console.error('Не удалось авторизоваться!');
    }
  };

  return (
    <form className='login' onSubmit={handleLogin}>
      <label>
        Имя пользователя:
        <MyInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Пароль:
        <MyInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <MyButton type="submit">Войти</MyButton>
    </form>
  );
};
