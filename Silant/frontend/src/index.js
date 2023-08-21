import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';

import RefreshToken from './components/RefreshToken';
import App from './App';

const Root = () => {
  const [tokenRefreshed, setTokenRefreshed] = useState(false);

  const handleTokenRefreshed = () => {
    setTokenRefreshed(true);
  };

  return (
    <Provider store={store}>
      <RefreshToken onTokenRefreshed={handleTokenRefreshed} />
      {tokenRefreshed ? <App /> : <h1>Ожидание обновления токена...</h1>}
    </Provider>
  );
};

createRoot(document.getElementById('root')).render(<Root />);