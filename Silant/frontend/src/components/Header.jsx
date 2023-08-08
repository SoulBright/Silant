import React from 'react'

import Login from './Login'

import "../styles/Header.css"

export default function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src={process.env.PUBLIC_URL + '/Images/logo.jpg'} alt='Логотип' />
            </div>
            <div className="h-container">
                <div className="h-wrapper">
                    <div className="contacts">
                        <h3> тел: +7-8352-20-12-09, telegram </h3>
                    </div>
                    <div className="sign-up">
                        <Login />
                    </div>
                </div>
                <div className="title">
                    <h1> Электорнная сервисная книжка "Мой Силант" </h1>
                </div>
            </div>
        </div >
    )
}
