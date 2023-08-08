import React from "react";
import Modal from 'react-modal';

import './styles/App.css'


import Header from "./components/Header"
import Body from "./components/Body";
import Footer from "./components/Footer";


export default function App() {
  Modal.setAppElement('#root');
  return (
    <div className="application">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}