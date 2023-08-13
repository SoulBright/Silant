import React from 'react';
import { useSelector } from 'react-redux';

import Main from "./Main";
import SearchMachines from "./SearchMachines";

import "../styles/Body.css";

export default function Body() {
  const isUserAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className='body'>
      {isUserAuthenticated ? <Main /> : <SearchMachines />}
    </div>
  );
}
