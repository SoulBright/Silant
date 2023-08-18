import React, { useState } from 'react';
import axios from "../axiosConfig";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { login } from '../authReducer';

import MyInput from '../UI/Input/MyInput';
import MyButton from '../UI/Button/MyButton';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/token/', {
        username: username,
        password: password,
      });

      const data = response.data;
      const token = data.access

          try {
            const response = await axios.post('http://127.0.0.1:8000/api/get-user', {
              access: token
            });

            const { username, client, company, manager } = response.data;

            localStorage.setItem('username', username);
            localStorage.setItem('client', client);
            localStorage.setItem('company', company);
            localStorage.setItem('manager', manager);

          } catch (error) {
            console.error(error);
          }

        dispatch(login(data));
      } catch (error) {
        toast.error('Вы ввели неверные данные');
      }
    };

    return (
      <form className="login" onSubmit={handleLogin}>
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </form>
    );
  }
  