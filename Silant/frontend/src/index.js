import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<Root />, document.getElementById('root'));