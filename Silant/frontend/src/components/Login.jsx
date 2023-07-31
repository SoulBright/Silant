import React, { useState } from 'react';
import MyInput from '../UI/Input/MyInput';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      // Авторизация прошла успешно
      // Вы можете выполнить дополнительные действия здесь, например, перенаправление пользователя
      console.log('Успешная авторизация!');
    } else {
      // Возникла ошибка при авторизации
      console.error('Не удалось авторизоваться!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;