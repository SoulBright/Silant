import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateAuthToken } from '../authReducer';

export default function RefreshToken({ onTokenRefreshed }) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = async () => {
      const refresh = localStorage.getItem('refreshToken');

      if (refresh) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refresh,
          });

          const newToken = response.data.access;
          dispatch(updateAuthToken(newToken));
          localStorage.setItem('authToken', newToken);
          onTokenRefreshed();
        } catch (error) {
          console.error('Произошла ошибка при обновлении токена:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        onTokenRefreshed();
      }
    };

    refreshToken();

    const intervalId = setInterval(refreshToken, 1 * 5 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, onTokenRefreshed]);

  if (isLoading) {
    return;
  }

  return null;
};
