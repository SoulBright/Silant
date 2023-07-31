import React from 'react'

import MyButton from '../UI/Button/MyButton'

import "../styles/Header.css"

export default function Header() {
  return (
    <div className="header">
            <div className="container">
                <div className="ico">
                    <h3> Логотип </h3>
                </div>
                <div className="contacts">
                    <h3> тел: +7-8352-20-12-09, telegram </h3>
                </div>
                <div className="sign-up">
                    <MyButton> Войти </MyButton>
                </div>
                <div className="title">
                    <h3> Электорнная сервисная книжка "Мой Силант" </h3>
                </div>
            </div>
        </div>
  )
}


