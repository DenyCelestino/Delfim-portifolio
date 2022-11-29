import React, { useState } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'
import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { username, email, message } = formData

  const handleChangeInput = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    setLoading(true)

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message
    }

    client
      .create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h2 className="head-text">Vamos tomar um café e fale comigo</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a
            href="mailto:denycelestino21@gmail.com"
            className="p-text"
          >
            denycelestino21@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="tel: +258866460507" className="p-text">
            +258866460507
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Seu nome"
              name="username"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Seu email"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Sua mensagem"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button
            type="button"
            className="p-text"
            onClick={handleSubmit}
          >
            {!loading ? 'Enviar mensagem' : 'Enviando...'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Problemas no envio, por favor toque no meu email ou no
            numero acima para falar comigo... Obrigado
          </h3>
        </div>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)
